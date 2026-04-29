const { isValidPassword } = require('./validator');

describe('isValidPassword', () => {
  
  //------------------ test 1 - valid password--------------
  test('should accept valid password', () => {
    const result = isValidPassword('Password123');
    expect(result.valid).toBe(true);
    expect(result.reason).toBe('');
  });

  //--------------------- test 2 - short password--------------------
  test('password too short should fail', () => {
    const result = isValidPassword('Pass12');
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Too short (min 8 characters)');
  });

  // test 3 - no uppercase
  test('no uppercase letter fails', () => {
    const result = isValidPassword('password123');
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Must contain an uppercase letter');
  });

  //------------------------- test 4 - no number ------------------- 
  test('should fail without number', () => {
    const result = isValidPassword('PasswordABC');
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Must contain a number');
  });

  // test 5 - wrong type 
  test('non-string input fails', () => {
    const result = isValidPassword(12345);
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Password must be a string');
  });

  //---------------------------- test 6 - 8 characters--------------
  test('8 characters works', () => {
    const result = isValidPassword('Pass1234');
    expect(result.valid).toBe(true);
  });

  //--------------------- bonus - empty string----------------------
  test('empty string should fail', () => {
    const res = isValidPassword('');
    expect(res.valid).toBe(false);
  });

  //--------------------- bonus - very long password-----------------
  test('very long password still works', () => {
    const longPass = 'Password1' + 'a'.repeat(100);
    const result = isValidPassword(longPass);
    expect(result.valid).toBe(true);
  });

});
