package lab4.area;

import javax.ejb.Stateless;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Stateless
public class AreaBean implements Area {

    private static final BigDecimal MINUS_ONE = BigDecimal.valueOf(-1);
    private static final BigDecimal HALF = new BigDecimal("0.5");

    @Override
    public boolean checkPoint(
            @DecimalMin(value = "-5", inclusive = false) @DecimalMax(value = "3", inclusive = false)
            @NotNull BigDecimal x,
            @DecimalMin(value = "-5", inclusive = false) @DecimalMax(value = "3", inclusive = false)
            @NotNull BigDecimal y,
            @DecimalMin(value = "-5", inclusive = false) @DecimalMax(value = "3", inclusive = false)
            @NotNull BigDecimal r
    ) {
        if (r.compareTo(BigDecimal.ZERO) < 0) {
            return doCheckPoint(x.multiply(MINUS_ONE), y.multiply(MINUS_ONE), r.multiply(MINUS_ONE));
        }

        return doCheckPoint(x, y, r);
    }

    private boolean doCheckPoint(BigDecimal x, BigDecimal y, BigDecimal r) {
        final BigDecimal halfR = r.multiply(HALF);

        return ((x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0
                && x.multiply(x).add(y.multiply(y)).compareTo(halfR.multiply(halfR)) <= 0)
                || (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0
                && x.multiply(HALF).subtract(halfR).compareTo(y) <= 0)
                || (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0
                && x.compareTo(halfR.negate()) >= 0 && y.compareTo(r.negate()) >= 0));
    }
}
