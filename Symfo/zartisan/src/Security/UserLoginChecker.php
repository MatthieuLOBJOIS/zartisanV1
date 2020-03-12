<?php

namespace App\Security;

use App\Entity\User;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\StatusNotEnableException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;


class UserLoginChecker implements UserCheckerInterface
{

    /**
   * 
   * @return string bool
   * 
   * throw exception if authentication canceled
   */
    public function checkPreAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->isEmailVerified()) {
            throw new EmailNotVerifiedException($user);
        }

        if (!$user->isStatusEnable()) {
            throw new StatusNotEnableException($user);
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }
    }
}
