<?php

namespace App\Services;


class FileTablePictures
{
  private $path;
  private $pathTemp;
  private $dirCompany;
  private $dirTemp = "assets/images/temporary";
  private $image_parts;
  private $image_type_aux;
  private $image_type;
  private $image_en_base64;
  private $file;
  private $tab = [];
  private $extensions = ['png', 'jpg', 'jpeg'];
  private $control = false;

  public function __construct(
    $path = '',
    $pathTemp = '',
    $dirCompany = '',
    $image_parts = '',
    $image_type_aux = '',
    $image_typenew_aux = '',
    $image_type = '',
    $image_en_base64 = '',
    $file = ''
  ) {
    $this->path = $path;
    $this->pathTemp = $pathTemp;
    $this->dirCompany = $dirCompany;
    $this->image_parts = $image_parts;
    $this->image_type_aux = $image_type_aux;
    $this->image_type = $image_type;
    $this->image_en_base64 = $image_en_base64;
    $this->file = $file;
  }

  /**
   * @param string $picture64
   * @return int $cpt
   *
   * verify if only old pictures
   */
  public function controlPicturesOld(array $picture64): int
  {
    $cpt = 0;
    foreach ($picture64 as $key => $picture) {
      $image = substr("$picture64[$key]", 0, 6);
      if ($image == "assets") {
        $cpt++;
      }
    }
    return $cpt;
  }

  /**
   * @param string $picture64, $userEmail
   * @return string $file
   */
  public function createTableMixPictures(array $picture64, string $userEmail)
  {

    if(is_dir($this->dirTemp)) {
      array_map('unlink', glob($this->dirTemp . "/*.*"));
      rmdir($this->dirTemp);
    }
    
    $this->path = "assets/images/" . $userEmail . '/compagny/';           // definit chemin du dossier
    $this->dirCompany = "assets/images/" . $userEmail . '/compagny';
    mkdir($this->dirTemp);
    $this->pathTemp  = $this->dirTemp . "/";

    // TODO verify if old picture or new picture
    foreach ($picture64 as $key => $picture) {

      $image = substr("$picture64[$key]", 0, 6);
      if ($image == "assets") {
        $this->image_parts = explode('/', $picture);
        $fileName = $this->image_parts[4];
        $extension = pathinfo($fileName, PATHINFO_EXTENSION);

        // TODO Si l'extension n'est pas dans le tableau $extensions
        if (!in_array($extension, $this->extensions)) {
          return '409';
        }

        copy($picture, $this->pathTemp . $fileName);
      } //($image == "assets")
    }

    // 
    array_map('unlink', glob($this->path . "/*.*"));

    // TODO buckle for new pictures
    foreach ($picture64 as $key => $picture) {

      $image = substr("$picture64[$key]", 0, 6);
      if ($image != "assets") {
        $this->image_parts = explode(";base64,", $picture64[$key]);         // scinde le fichier 0 => "data:image/png", 1 => "imagebase64"
        $this->image_type_aux = explode("image/", $this->image_parts[0]);   // correspopnd 0 => 'data, 1 => 'png'
        $image_type = $this->image_type_aux[1];                             // renvoie extension 'png'

        if (!in_array($image_type, $this->extensions)) {                       // Si l'extension n'est pas dans le tableau $extensions
          rename($this->pathTemp, $this->path);
          return '409';
        }
        $this->image_en_base64 = base64_decode($this->image_parts[1]);      // correspond au code image decodée de base64
        $this->file = $this->path . uniqid() . '.' . $image_type;           // création numéro image unique
        file_put_contents($this->file, $this->image_en_base64);
        $this->tab[] = $this->file;
      }
    }

    if($this->custom_copy($this->dirTemp, $this->dirCompany)) {
      array_map('unlink', glob($this->pathTemp . "/*.*"));
      rmdir($this->pathTemp);
      array_map('unlink', glob($this->dirTemp . "/*.*"));
      rmdir($this->dirTemp);
    } 
    return $this->tab;
    //dd('stop2');
  }

  /**
   * @param string $picture64, $userEmail
   * @return array $tab
   *
   * create folder witdh new pictures
   */
  public function createTableNewPictures(array $picture64, string $userEmail): array
  {
    $this->path = "assets/images/" . $userEmail . '/compagny/';           // definit chemin du dossier
    array_map('unlink', glob($this->path . "/*.*"));                     // supprime les fichiers dans le dossier

    foreach ($picture64 as $key => $picture) {
      $this->image_parts = explode(";base64,", $picture64[$key]);         // scinde le fichier 0 => "data:image/png", 1 => "imagebase64"
      $this->image_type_aux = explode("image/", $this->image_parts[0]);   // correspopnd 0 => 'data, 1 => 'png'
      $image_type = $this->image_type_aux[1];                             // renvoie extension 'png'

      if (!in_array($image_type, $this->extensions)) {                       // Si l'extension n'est pas dans le tableau $extensions
        return '409';
      }
      $this->image_en_base64 = base64_decode($this->image_parts[1]);      // correspond au code image decodée de base64
      $this->file = $this->path . uniqid() . '.' . $image_type;           // création numéro image unique
      file_put_contents($this->file, $this->image_en_base64);             // ecrit  le fichier dans le dossier
      $this->tab[] = $this->file;                                         // ecrit l'url dans le tableau pour l'entité pisctureFolder ds la BDD
    }
    return $this->tab;
  }


  /**
   * @param string $src, $dst
   * @return void
   *
   * copy files to folder company and inject in tab[]
   */
  public function custom_copy($src, $dst)
  {
    // open the source directory 
    $dir = opendir($src);
    // Loop through the files in source directory 
    while ($file = readdir($dir)) {
      if (($file != '.') && ($file != '..')) {
        if (is_dir($src . '/' . $file)) {
          // Recursively calling custom copy function 
          // for sub directory  
          custom_copy($src . '/' . $file, $dst . '/' . $file);
        } else {
          if(copy($src . '/' . $file, $dst . '/' . $file)) {
            $this->tab[] = $dst . '/' . $file;
          }else {
            return '501';
          }  
        }
      }
    }
    closedir($dir);
  }
}
