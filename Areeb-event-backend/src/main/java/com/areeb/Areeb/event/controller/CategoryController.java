package com.areeb.Areeb.event.controller;

import com.areeb.Areeb.event.dto.CategoryDTO;
import com.areeb.Areeb.event.entity.Category;
import com.areeb.Areeb.event.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping("auth/category")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return categoryService.findAll();
    }

    @PostMapping("admin/category/add")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        return categoryService.add(category);
    }
    @PutMapping("admin/category/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        return categoryService.update(category);
    }


}
