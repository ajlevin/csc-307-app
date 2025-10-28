// module.test.js
const mut = require('./module.js'); // MUT = Module Under Test

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 3;
    const got = mut.div(12, 4);
    expect(got).toBe(expected);
});

test('Testing div -- dividing by zero', () => {
    expect(() => mut.div(1, 0)).toThrow("Invalid division by zero");
});

test('Testing contains numbers -- contains numbers', () => {
    const got = mut.containsNumbers("thisstringcontainsnumbers1010");
    expect(got).toBeTruthy();
});

test('Testing contains numbers -- no numbers', () => {
    const got = mut.containsNumbers("thisstringdoesn'tcontainnumbers");
    expect(got).toBeFalsy();
});

// Errors out due to coercian in NaN
test('Testing contains numbers -- string containing a single space', () => {
    const got = mut.containsNumbers(" ");
    expect(got).toBeFalsy();
});
