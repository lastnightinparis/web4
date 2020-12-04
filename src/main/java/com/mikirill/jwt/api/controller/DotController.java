package com.mikirill.jwt.api.controller;

import com.mikirill.jwt.api.entity.AuthRequest;
import com.mikirill.jwt.api.entity.Dot;
import com.mikirill.jwt.api.entity.PointRequest;
import com.mikirill.jwt.api.repository.DotRepository;
import com.mikirill.jwt.api.service.DotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

/**
 * @author Kir
 * Created on 02.12.2020
 */
@EnableTransactionManagement
@RestController
public class DotController {
    @Autowired
    private DotService dotService;

    @Autowired
    private DotRepository dotRepository;

    @GetMapping("/points")
    public List<Dot> getAll(@RequestBody AuthRequest auth) {
        return dotRepository.getAllByUsername(auth.getUsername());
    }

    @PostMapping("/points")
    public void addPoint(@RequestBody PointRequest point) {
        System.out.println("inserting");
        Dot dot = new Dot();
        String res;
        dot.setJsessionid(point.getUsername());
        dot.setR_value(point.getR());
        dot.setX_value(point.getX());
        dot.setY_value(point.getY());
        dot.setCurrent_time(new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime()));
        long time = System.currentTimeMillis();
        if (dotService.validate(point.getX(), point.getY(), point.getR())) {
            res = dotService.checkArea(point.getX(), point.getY(), point.getR()) ? "TRUE" : "FALSE";
        } else res = "ERROR";
        dot.setHit_result(res);
        dot.setScript_time(System.currentTimeMillis() - time);
        dotRepository.save(dot);
    }

    @DeleteMapping("/points")
    @Transactional
    public void deleteAll(@RequestParam("username") String username) {
        dotRepository.deleteDotsByUsername(username);
    }

}
