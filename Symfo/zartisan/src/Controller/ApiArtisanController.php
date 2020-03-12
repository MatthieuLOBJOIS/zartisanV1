<?php

namespace App\Controller;

use App\Services\FoldersUser;
use App\Manager\SecurityManager;
use App\Repository\RateRepository;
use App\Repository\UserRepository;
use App\Services\FileLogoCreate;
use App\Services\FileTablePictures;
use App\Repository\AdviceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ApiArtisanController extends AbstractController
{

    /**
     * @Route("api/v1/artisan/edit", name="api_artisan_edit")
     */
    public function edit(
        UserRepository $userRepository,
        Request $request,
        EntityManagerInterface $em,
        FoldersUser $foldersUser,
        FileLogoCreate $fileLogoCreate,
        FileTablePictures $fileTablePictures,
        SecurityManager $securityManager
    ) {
        if ($request->get('email')) {

            // if good format email
            $error = $securityManager->securityEmail($request->get('email'));
            if (isset($error)) {
                return $this->json(['error' => $error], 409);
            }

            // verify if  email is in the BDD
            $userEmail = $request->get('email');

            // if email don't find
            if (!$userRepository->isFoundMail($request->get('email'))) {
                return $this->json(['error' => 'Email not exist'], 404);
            }
            $user = $userRepository->isFoundMail($userEmail);

            // verify if folder exist
            $userRole = 'ARTISAN';
            $foldersUser->isFolder($userEmail, $userRole);  // verification if folder exist

            // TODO if picture is uploaded
            $picture64 = ($request->get('picture'));
            $image = substr("$picture64", 0, 6);
            if ($image != "assets") {
                $file = $fileLogoCreate->createPicture($picture64, $userEmail);   // inject avatar in file logo
                if ($file == 409) {
                    return $this->json(['error' => 'Vous devez uploader un fichier de type png, jpg, jpeg'], 409);
                }
                
                $user->setPicture($file);
            } 

            // TODO if pictureFolder is uploaded 
            $pictureFolder64 = ($request->get('pictureFolder'));
            $counter = count($pictureFolder64); 
            $counterBdd = count($user->getPictureFolder());
            
            if ($counter != 0 && $counter >= $counterBdd) {
                // TODO verify if old pictures
                $controlOld = $fileTablePictures->controlPicturesOld($pictureFolder64, $counter);

                // TODO if no pictures uploaded
                if ($controlOld != $counter) {
                
                    // TODO if new pictures uploaded
                    if ($controlOld == 0) {
                            $file = $fileTablePictures->createTableNewPictures($pictureFolder64, $userEmail);
                            if ($file == 409) {
                                return $this->json(['error' => 'Vous devez uploader un fichier de type png, jpg, jpeg'], 409);
                            }
                    } //($controlOld == 0)
                    else {
                        $file = $fileTablePictures->createTableMixPictures($pictureFolder64, $userEmail);
                        if ($file == 409) {
                            return $this->json(['error' => 'Vous devez uploader un fichier de type png, jpg, jpeg'], 409);
                        } 
                        if ($file == 501) {
                            return $this->json(['error' => 'Not Implemented'], 501);
                        }      
                    }
                    $user->setPictureFolder($file);
                } //($controlOld != $counter)    
            } //($counter != 0 && $counter >= $counterBdd)

            // TODO if picture delete
            if ($counter != 0 && $counter < $counterBdd) {
                $file = $fileTablePictures->createTableMixPictures($pictureFolder64, $userEmail);
                if ($file == 409) {
                    return $this->json(['error' => 'Vous devez uploader un fichier de type png, jpg, jpeg'], 409);
                } 
                if ($file == 501) {
                    return $this->json(['error' => 'Not Implemented'], 501);
                }   
                $user->setPictureFolder($file);
            } //($counter != 0 && $counter < $counterBdd)

            $user->setCompanyDescription($request->get('companyDescription'));
            $user->setPhone($request->get('phone'));

            $user->setUpdatedAt(new \DateTime());

            $em->persist($user);
            $em->flush();
            return $this->json($user, 200, [], ['groups' => 'user_artisan_single']);
        }
        return $this->json(['error' => 'unexpected information for edit request'], 304, []);
    }

    /**
     * @Route("v1/artisan/list", name="artisan_all")
     */
    public function all(UserRepository $userRepository)
    {
        $users = $userRepository->findAll();

        $arrayUsers = [];

        foreach ($users as $user) {
            $arrayUsers[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'url' => $this->generateUrl('api_artisan_single', [
                    'id' => $user->getId()
                ], UrlGeneratorInterface::ABSOLUTE_URL)
            ];
        }
        return $this->json($arrayUsers, 200, []);
    }


    /**
     * @Route("v1/artisan/recherche", name="artisan_recherche")
     */
    public function searchByRate(UserRepository $userRepository, Request $request)
    {
        $arrayUsers = [];
        if ($request->get('idJob')) {

            $job = $request->get('idJob');
            $region = $request->get('nameRegion');

            $arrayUsers = $userRepository->searchOrderRate($job, $region);

            return $this->json($arrayUsers, 200, [], ['groups' => 'user_artisan_search']);
        }
        return $this->json(['error' => 'unexpected information for edit request'], 304, []);
    }


    /**
     * @Route("v1/artisan/single", name="artisan_single")
     */
    public function single(
        Request $request,
        AdviceRepository $adviceRepository,
        RateRepository $rateRepository,
        UserRepository $userRepository,
        SecurityManager $securityManager
    ) {
        if ($request->get('email')) {

            // if good format email
            $error = $securityManager->securityEmail($request->get('email'));
            if (isset($error)) {
                return $this->json(['error' => $error], 409);
            }

            // verify if  email is in the BDD
            $userEmail = $request->get('email');

            // if email don't find
            if (!$userRepository->isFoundMail($request->get('email'))) {
                return $this->json(['error' => 'Email not exist'], 404);
            }

            $user = $userRepository->isFoundMail($request->get('email'));
            $advices = $adviceRepository->isFoundAdvice($user->getId());

            return $this->json([$user, $advices], 200, [], ['groups' => 'user_artisan_advice']);
        }
        return $this->json(['error' => 'no request'], 304, []);
    }
}
