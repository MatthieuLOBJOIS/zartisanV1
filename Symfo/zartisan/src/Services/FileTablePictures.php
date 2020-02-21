<?php

namespace App\Services;

class FileTablePictures
{
    private $path;
    private $image_parts;
    private $image_type_aux;
    private $image_type;
    private $image_en_base64;
    private $file;
    private $tab;
    private $extensions = ['png', 'jpg', 'jpeg'];
    private $control = false;

    public function __construct(
        $path = '',
        $image_parts = '',
        $image_type_aux = '',
        $image_typenew_aux = '',
        $image_type = '',
        $image_en_base64 = '',
        $file = ''
    ) {
        $this->path = $path;
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
     * verify if only new pictures
     */
    public function controlPicturesNew(array $picture64): int
    {
        $cpt = 0;
        foreach ($picture64 as $key => $picture) {
            $image = substr("$picture64[$key]", 0, 6);
            if ($image != "assets") {
                $cpt++;
            }
        }
        return $cpt;
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
}
