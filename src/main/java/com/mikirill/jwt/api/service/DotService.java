package com.mikirill.jwt.api.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * @author Kir
 * Created on 02.12.2020
 */
@Service
public class DotService {

    public boolean validate(Double x, Double y, int r) {
        Integer[] a = {1, 2, 3, 4, 5};
        return (x > -5 && x < 5 && y > -3 && y < 5 && Arrays.asList(a).contains(r));
    }

    public boolean checkODZ(double x, double y, int r) {
        System.out.println(x + "; " + y + "; " + r);
        if (x >= 0 && y >= 0)
            return checkFirstQ(x, y, r);
        else if (x <= 0 && y <= 0)
            return checkThirdQ(x, y, r);
        else if (x >= 0 && y <= 0)
            return checkFourthQ(x, y, r);
        else
            return checkSecondQ(x, y, r);
    }

    public boolean checkFirstQ(double x, double y, int r) {
        return false;
    }

    public boolean checkSecondQ(double x, double y, int r) {
        return (x <= r && y <= r * .5);
    }

    public boolean checkThirdQ(double x, double y, int r) {
        return (y <= x - r * .5);
    }

    public boolean checkFourthQ(double x, double y, int r) {
        return (x * x + y * y <= r * r);
    }
}
