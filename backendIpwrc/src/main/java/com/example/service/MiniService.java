package com.example.service;

import com.example.entity.Mini;
import com.example.repo.MiniRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class MiniService {
    private final MiniRepo miniRepo;

    public MiniService(MiniRepo miniRepo) {
        this.miniRepo = miniRepo;
    }

    public ResponseEntity<Mini> saveMini(@RequestBody Mini mini){
        Mini newMini = miniRepo.save(mini);
        return ResponseEntity.ok(newMini);
    }

    public ResponseEntity<List<Mini>> fetchAllMinis(){
        return ResponseEntity.ok(miniRepo.findAll());
    }

    public ResponseEntity<Optional<Mini>>fetchMiniById(Long id){
        Optional<Mini> mini = miniRepo.findById(id);
        if (mini.isPresent()){
            return ResponseEntity.ok(mini);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Mini> updateMini(Long id, Mini updateMini){
        if(id == null){
            throw new IllegalArgumentException("ID can not be NULL");
        }
        Mini ExistingMini = miniRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.valueOf(id)));
        ExistingMini.setName(updateMini.getName());
        ExistingMini.setPrice(updateMini.getPrice());
        ExistingMini.setDescription(updateMini.getDescription());
        ExistingMini.setQuantity(updateMini.getQuantity());
        ExistingMini.setImgPath(updateMini.getImgPath());
        Mini savedEntity = miniRepo.save(ExistingMini);
        return ResponseEntity.ok(savedEntity);

    }

    public ResponseEntity<String> deleteMini(Long id)
    {
        miniRepo.deleteById(id);
        return ResponseEntity.ok(
                "Mini Deleted Successfully");
    }


}



