<?php
declare(strict_types=1);

namespace App\Exceptions;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\AccountStatusException;

class EmailNotVerifiedException extends AccountStatusException
{
    public function __construct(User $user)
    {
        parent::__construct('Email address not verified.');
        $this->setUser($user);
    }
}