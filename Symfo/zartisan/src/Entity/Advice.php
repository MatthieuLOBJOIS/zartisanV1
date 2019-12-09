<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AdviceRepository")
 */
class Advice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * Groups("user_artisan_single")
     */
    private $body;

    /**
     * @ORM\Column(type="boolean")
     * Groups("user_artisan_single")
     */
    private $isStatus;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isReported;

    /**
     * @ORM\Column(type="datetime")
     * Groups("user_artisan_single")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="advices")
     * @ORM\JoinColumn(nullable=false)
     * Groups("user_artisan_single")
     */
    private $userAuthor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="advice")
     * @ORM\JoinColumn(nullable=false)
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

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getIsStatus(): ?bool
    {
        return $this->isStatus;
    }

    public function setIsStatus(bool $isStatus): self
    {
        $this->isStatus = $isStatus;

        return $this;
    }

    public function getIsReported(): ?bool
    {
        return $this->isReported;
    }

    public function setIsReported(bool $isReported): self
    {
        $this->isReported = $isReported;

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
