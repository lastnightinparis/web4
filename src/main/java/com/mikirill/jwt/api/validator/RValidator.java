package com.mikirill.jwt.api.validator;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Array;
import java.util.Arrays;

public class RValidator implements ConstraintValidator<RValue, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        double[] r_values = {0.5, 1, 1.5, 2};
        return Arrays.asList(r_values).contains(Double.parseDouble(s));
    }
}
