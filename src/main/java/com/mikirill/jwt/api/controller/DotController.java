package com.mikirill.jwt.api.controller;

import com.mikirill.jwt.api.entity.Dot;
import com.mikirill.jwt.api.repository.DotRepository;
import com.mikirill.jwt.api.service.DotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Kir
 * Created on 02.12.2020
 */
@RestController
public class DotController {
    @Autowired
    private DotService dotService;

    @Autowired
    private DotRepository dotRepository;

    @GetMapping("/pointlist")
    public List<Dot> getAll(@RequestBody String jsessionid) {
        return dotRepository.getAllByJsessionid(jsessionid);
    }

    @PostMapping("/insert") //TODO
    public void addPoint(@RequestBody Dot point) {

        long time = System.currentTimeMillis();

        dotRepository.save(point);
    }

    @DeleteMapping("/reset")
    public void deleteAll(@RequestBody String jsessionid) {
        dotRepository.deleteDotsByJsessionid(jsessionid);
    }

}
