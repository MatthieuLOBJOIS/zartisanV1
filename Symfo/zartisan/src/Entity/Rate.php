<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass="App\Repository\RateRepository")
 */
class Rate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("user_artisan_single")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("user_artisan_single")
     */
    private $value;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="rates")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("user_artisan_single")
     */
    private $userAuthor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="rate")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("user_artisan_single")
     */
    private $userPro;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(?int $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUserAuthor(): ?User
    {
        return $this->userAuthor;
    }

    public function setUserAuthor(?User $userAuthor): self
    {
        $this->userAuthor = $userAuthor;

        return $this;
    }

    public function getUserPro(): ?User
    {
        return $this->userPro;
    }

    public function setUserPro(?User $userPro): self
    {
        $this->userPro = $userPro;

        return $this;
    }
}
