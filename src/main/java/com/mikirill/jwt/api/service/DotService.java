package com.mikirill.jwt.api.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * @author Kir
 * Created on 02.12.2020
 */
@Service
public class DotService {

    public boolean validate(Double x, Double y, Double r) {
        double[] r_values = {0.5, 1, 1.5, 2};
        return (x > -2 && x < 2 && y > -3 && y < 5 && Arrays.asList(r_values).contains(r));
    }
    private boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0)
            return checkFirstQ(x, y, r);
        else if (x <= 0 && y <= 0)
            return checkThirdQ(x, y, r);
        else if (x >= 0 && y <= 0)
            return checkFourthQ(x, y, r);
        else
            return checkSecondQ(x, y, r);
    }

    private boolean checkFirstQ(double x, double y, double r) {
        return false;
    }

    private boolean checkSecondQ(double x, double y, double r) {
        return (x >= -r && y <= r / 2);
    }

    private boolean checkThirdQ(double x, double y, double r) {
        return y > - x - r / 2;
    }

    private boolean checkFourthQ(double x, double y, double r) {
        return (x * x + y * y <= (r * r)/4);
    }

}
