package com.example.controller;

import com.example.entity.Mini;
import com.example.repo.MiniRepo;
import com.example.service.MiniService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/minicon")
public class MiniController {
    private final MiniService miniService;
    private final MiniRepo miniRepo;

    public MiniController(MiniService miniService, MiniRepo miniRepo){
        this.miniService = miniService;
        this.miniRepo = miniRepo;
    }


    @PostMapping("/mini")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Mini> saveMini(@RequestBody Mini mini){
        Mini newMini = miniService.saveMini(mini).getBody();
        return ResponseEntity.ok(newMini);
    }

    @GetMapping("/minis")
    public List<Mini> getAllMinis(){
        return miniService.fetchAllMinis().getBody();
    }

    @GetMapping("/minis/{id}")
    public ResponseEntity<ResponseEntity<Optional<Mini>>> getMiniById(@PathVariable Long id){
        ResponseEntity<Optional<Mini>> mini = miniService.fetchMiniById(id);
        if (mini != null){
            return ResponseEntity.ok(mini);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/minis/{miniId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Mini> updateMini(@PathVariable(value = "miniId") Long miniId, @RequestBody Mini mini){
        return miniService.updateMini(miniId, mini);
    }

    @DeleteMapping(value = "/minis/{miniId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public String deleteMini(@PathVariable Long miniId){
        miniService.deleteMini(miniId);
        return "Mini deleted successfully with id" + miniId;
    }


}
