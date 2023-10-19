package tn.esprit.ms_livre.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_livre.Entity.Book;
import tn.esprit.ms_livre.Entity.Category;
import tn.esprit.ms_livre.Repository.BookRepository;
import tn.esprit.ms_livre.Repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    public void addCategory(Category category) {
        categoryRepository.save(category);

    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }


    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);

    }

    public Category getById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }


}
