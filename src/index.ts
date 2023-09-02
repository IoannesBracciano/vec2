/**
 * @module vec2js
 * @summary
 * A collection of functions to create and operate on two-dimensional
 * vectors, represented as simple JavaScript arrays of two numbers.
 * @license
 * MIT License
 * @author
 * Ioannis Brastianos <john.bracciano@gmail.com>
 */

import assert from 'assert';
import curry from 'lodash.curryright';

/**
 * Represents a scalar value (number).
 */
export type Scalar = number;

/**
 * Represents a 2D vector as an array of two `Scalar` values.
 */
export type Vec2 = [Scalar, Scalar];

/**
 * Create a zero-length 2D vector (0,0) represented as `Vec2`.
 * @returns {Vec2}
 */
export const zero = (): Vec2 => [0, 0];

/**
 * Transform polar to cartesian coordinates.
 * @description
 * Polar coordinates describe a 2D vector using the angle it forms with
 * the horizontal axis and its length.
 * @param {Vec2} a
 * The polar coordinates of a 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the 2D vector as `Vec2`.
 */
export const fromPolar = ([angle, length]: Vec2): Vec2 => (
    rotate([length, 0], angle)
)

/**
 * Transform cartesian to polar coordinates.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @returns {Vec2}
 * The polar coordinates of the 2D vector as `Vec2`.
 */
export const toPolar = (a: Vec2) => [angle(a), length(a)]

/**
 * Negate a 2D vector.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the negated 2D vector as `Vec2`.
 * @example
 * negate([1, 2]) // [-1, -2]
 */
export const negate = (a: Vec2): Vec2 => [-a[0], -a[1]];

/**
 * Add two 2D vectors.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the resulting 2D vector as `Vec2`.
 * @example
 * add([1, 2], [3, 4]) // [4, 6]
 */
export const add = curry((a: Vec2, b: Vec2): Vec2 => (
    [a[0] + b[0], a[1] + b[1]]
));

/**
 * Subtract two 2D vectors.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the resulting 2D vector as `Vec2`.
 * @example
 * sub([1, 2], [3, 4]) // [-2, -2]
 */
export const sub = curry((a: Vec2, b: Vec2): Vec2 => (
    [a[0] - b[0], a[1] - b[1]]
));

/**
 * Scale a 2D vector.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @param {Scalar} b
 * A `Scalar` value to scale `a` by.
 * @returns {Vec2}
 * The cartesian coordinates of the scaled 2D vector as `Vec2`.
 * @example
 * scale([1, 2], 3) // [3, 6]
 */
export const scale = curry((a: Vec2, b: Scalar): Vec2 => (
    [a[0] * b, a[1] * b]
));

/**
 * Get the dot product of two 2D vectors.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Scalar}
 * The dot product of `a` and `b` as a `Scalar` value.
 * @example
 * dot([1, 2], [3, 4]) // 11
 */
export const dot = curry((a: Vec2, b: Vec2): Scalar => (
    a[0] * b[0] + a[1] * b[1]
));

/**
 * Get the length of a 2D vector.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @returns {Scalar}
 * The length of `a` as a `Scalar` value.
 * @example
 * length([3, 4]) // 5
 */
export const length = (a: Vec2): Scalar => Math.sqrt(dot(a, a));

/**
 * @alias `length`
 * @see length
 */
export const magnitude = length;

/**
 * @alias `length`
 * @see length
 */
export const norm = length;

/**
 * Get a unit length 2D vector that is perpendicular to the line
 * defined by another 2D vector.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of a 2D unit vector that is perpendicular
 * to the line defined by `a` as `Vec2`.
 * @example
 * normal([3, 4]) // [0.8, -0.6]
 * @example
 * normal([1, 0]) // [0, -1]
 * @example
 * normal([0, -1]) // [-1, 0]
 * @example
 * normal([-1, 0]) // [0, 1]
 * @example
 * normal([0, 1]) // [1, 0]
 */
export const normal = (a: Vec2): Vec2 => unit([a[1], -a[0]]);

/**
 * Scale a 2D vector to have a length of 1.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the scaled 2D unit vector as `Vec2`.
 * @example
 * unit([3, 4]) // [0.6, 0.8]
 */
export const unit = (a: Vec2): Vec2 => {
    assert.notDeepEqual(a, [0, 0]);
    return scale(a, 1 / length(a));
}

/**
 * Get the distance between two 2D vectors.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Scalar}
 * The distance between `a` and `b` as a `Scalar` value.
 * @example
 * distance([1, 2], [3, 4]) // 2.8284271247461903
 */
export const distance = curry((a: Vec2, b: Vec2): Scalar => (
    length(sub(a, b))
));

/**
 * Get the angle between two 2D vectors.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Scalar}
 * The angle between `a` and `b` as a `Scalar` value.
 * @example
 * angle([1, 2], [3, 4]) // 0.17985349979247847
 */
export const angle = curry((a: Vec2, b: Vec2): Scalar => {
    assert.notDeepEqual(a, [0, 0]);
    assert.notDeepEqual(b, [0, 0]);
    return Math.acos(dot(a, b) / (length(a) * length(b)))
});

/**
 * Rotate a 2D vector by a given angle.
 * @param {Vec2} a
 * The cartesian coordinates of a 2D vector as `Vec2`.
 * @param {Scalar} angle
 * A `Scalar` value representing the angle to rotate `a` by.
 * @returns {Vec2}
 * The cartesian coordinates of the rotated 2D vector as `Vec2`.
 */
export const rotate = curry((a: Vec2, angle: Scalar): Vec2 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [a[0] * c - a[1] * s, a[0] * s + a[1] * c];
});

/**
 * Get the projection of a 2D vector onto another 2D vector.
 * @param {Vec2} a
 * The cartesian coordinates of the first 2D vector as `Vec2`.
 * @param {Vec2} b
 * The cartesian coordinates of the second 2D vector as `Vec2`.
 * @returns {Vec2}
 * The cartesian coordinates of the vector projection of `a` onto `b`
 * as `Vec2`.
 * @example
 * project([1, 2], [3, 4]) // [1.44, 1.92]
 * @example
 * project([1, 2], [0, 1]) // [0, 2]
 */
export const project = curry((a: Vec2, b: Vec2): Vec2 => {
    assert.notDeepEqual(b, [0, 0]);
    return scale(b, dot(a, b) / dot(b, b))
});
