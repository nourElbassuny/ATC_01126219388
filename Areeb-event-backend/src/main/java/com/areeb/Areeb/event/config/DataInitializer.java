package com.areeb.Areeb.event.config;

import com.areeb.Areeb.event.entity.Category;
import com.areeb.Areeb.event.entity.Role;
import com.areeb.Areeb.event.entity.User;
import com.areeb.Areeb.event.repository.CategoryRepository;
import com.areeb.Areeb.event.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findUserByEmail("admin@example.com").isEmpty()) {
                User admin = new User();
                admin.setFirstname("Admin");
                admin.setLastname("User");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123")); // Always encode passwords!
                admin.setRole(Role.admin);
                userRepository.save(admin);
                System.out.println("✅ Admin user created.");
            } else {
                System.out.println("ℹ️ Admin user already exists.");
            }
        };
    }
    @Bean
    CommandLineRunner seedCategories(CategoryRepository categoryRepository) {
        return args -> {
            if (categoryRepository.count() <4) {
                Category tech = new Category();
                tech.setName("Technology");

                Category sports = new Category();
                sports.setName("Sports");

                Category music = new Category();
                music.setName("Music");

                Category health = new Category();
                health.setName("Health & Wellness");

                categoryRepository.saveAll(Arrays.asList(tech, sports, music, health));

                System.out.println("✅ Sample categories saved.");
            } else {
                System.out.println("ℹ️ Categories already exist. Skipping seeding.");
            }
        };
    }
}
