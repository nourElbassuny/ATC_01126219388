package com.areeb.Areeb.event.services;

import com.areeb.Areeb.event.dto.CategoryDTO;
import com.areeb.Areeb.event.entity.Category;
import com.areeb.Areeb.event.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<List<CategoryDTO>> findAll() {
        List<Object[]> categoryList=categoryRepository.findAllCategoryDTO();

        List<CategoryDTO> categoryDTOList=new ArrayList<>();
       for(Object[] row:categoryList) {
           CategoryDTO dto=new CategoryDTO(
                   ((Number) row[0]).intValue(),
                   (String) row[1]
           );
           categoryDTOList.add(dto);
       }
       return ResponseEntity.ok(categoryDTOList);
    }

    public ResponseEntity<?> add(Category category) {
        String categoryName = category.getName();
        if (categoryRepository.findCategoryByName(categoryName).isPresent()) {
            return ResponseEntity.badRequest().body("This category already exists");
        } else
            return ResponseEntity.ok(categoryRepository.save(category));
    }

    public ResponseEntity<Category> update(Category category) {
       return ResponseEntity.ok(categoryRepository.save(category));
    }

    public ResponseEntity<Void> delete(int id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
