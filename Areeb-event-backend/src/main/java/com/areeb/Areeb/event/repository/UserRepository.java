package com.areeb.Areeb.event.repository;

import com.areeb.Areeb.event.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserById(int id);
    Optional<User> findUserByEmail(String email);
}
