class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.img = imaginary;
  }

  add(other) {
    return new Complex(this.real + other.real, this.img + other.img);
  }

  subtract(other) {
    return new Complex(this.real - other.real, this.img - other.img);
  }

  multiply(other) {
    const real = this.real * other.real - this.img * other.img;
    const imaginary = this.real * other.img + this.img * other.real;
    return new Complex(real, imaginary);
  }

  divide(other) {
    const denominator = other.real * other.real + other.img * other.img;
    const real = (this.real * other.real + this.img * other.img) / denominator;
    const imaginary =
      (this.img * other.real - this.real * other.img) / denominator;
    return new Complex(real, imaginary);
  }

  conjugate() {
    return new Complex(this.real, -this.img);
  }

  magnitude() {
    return Math.sqrt(this.real * this.real + this.img * this.img);
  }

  phase() {
    return Math.atan2(this.img, this.real);
  }

  power(n) {
    const r = this.magnitude();
    const theta = this.phase();
    const rNew = Math.pow(r, n);
    const thetaNew = theta * n;
    const real = rNew * Math.cos(thetaNew);
    const imaginary = rNew * Math.sin(thetaNew);
    return new Complex(real, imaginary);
  }

  squareRoot() {
    const r = this.magnitude();
    const theta = this.phase();
    const rNew = Math.sqrt(r);
    const thetaNew = theta / 2;
    const real = rNew * Math.cos(thetaNew);
    const imaginary = rNew * Math.sin(thetaNew);
    return new Complex(real, imaginary);
  }

  toString() {
    if (this.img >= 0) {
      return `${this.real} + ${this.img}i`;
    } else {
      return `${this.real} - ${Math.abs(this.img)}i`;
    }
  }

  static fromString(str) {
    const regex = /^([+-]?\d+)\s*([+-]?)\s*(\d+)i$/;
    const match = str.match(regex);

    if (match) {
      const real = parseInt(match[1]);
      const sign = match[2] === "-" ? -1 : 1;
      const imaginary = sign * parseInt(match[3]);
      return new Complex(real, imaginary);
    } else {
      throw new Error("Invalid format");
    }
  }
}

try {
  const num1 = Complex.fromString("8 + 5i"); //Edit the Number
  const num2 = Complex.fromString("1 - 2i"); //Edit the number

  console.log("Addition:", num1.add(num2).toString());
  console.log("Subtraction:", num1.subtract(num2).toString());
  console.log("Multiplication:", num1.multiply(num2).toString());
  console.log("Division:", num1.divide(num2).toString());
  console.log("Conjugate:", num1.conjugate().toString());
  console.log("Magnitude:", num1.magnitude());
  console.log("Phase:", num1.phase());
  console.log("Power:", num1.power(2).toString());
  console.log("Square Root:", num1.squareRoot().toString());
  console.log("\nEstudiante : Walter Jaldin Gonzales ");
} catch (e) {
  console.error(e.message);
}
