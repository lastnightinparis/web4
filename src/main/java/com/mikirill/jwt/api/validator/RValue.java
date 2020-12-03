package com.mikirill.jwt.api.validator;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
@Documented
@Constraint(validatedBy = RValidator.class)
@Target( {METHOD, FIELD })
@Retention(RUNTIME)
public @interface RValue {
    String message() default "Invalid R value";
    Class<?>[]groups() default {};
    Class<? extends Payload>[]payload() default {};
}
