package com.areeb.Areeb.event.repository;

import com.areeb.Areeb.event.dto.CategoryDTO;
import com.areeb.Areeb.event.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findCategoryByName(String name);

    @Query("select  c.id as id ,c.name as name from Category c")
    List<Object[]> findAllCategoryDTO();
}
