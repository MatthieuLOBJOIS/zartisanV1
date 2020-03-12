<?php
declare(strict_types=1);

namespace App\Exceptions;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\AccountStatusException;

class StatusNotEnableException extends AccountStatusException
{
    public function __construct(User $user)
    {
        parent::__construct('Status not Enable.');
        $this->setUser($user);
    }
}