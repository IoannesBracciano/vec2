import { expect, describe, test } from 'vitest';
import type { Scalar, Vec2 } from '.';
import * as Vec2Js from '.';
import { AssertionError } from 'assert';

function fix(a: Scalar): Scalar;
function fix(a: Vec2): Vec2;
function fix(a: Scalar | Vec2) {
    const _fix = (a: Scalar) => +a.toFixed(7);
    if (Array.isArray(a)) {
        return a.map(_fix) as Vec2;
    }
    return _fix(a) as Scalar;
}

describe('Vec2', () => {

    test('negate', () => {
        const { negate } = Vec2Js;
        expect(negate([0, 0])).toEqual([-0, -0]);
        expect(negate([1, 2])).toEqual([-1, -2]);
        expect(negate([-1, -2])).toEqual([1, 2]);
        expect(negate([1, -1])).toEqual([-1, 1]);
    });

    test('add', () => {
        const { add } = Vec2Js;
        expect(add([1, 2], [3, 4])).toEqual([4, 6]);
        expect(add([1, 2])([3, 4])).toEqual([4, 6]);
        expect(add([3, 4])([1, 2])).toEqual([4, 6]);
    });

    test('sub', () => {
        const { sub } = Vec2Js;
        expect(sub([1, 2], [3, 4])).toEqual([-2, -2]);
        expect(sub([1, 2])([3, 4])).toEqual([2, 2]);
        expect(sub([3, 4])([1, 2])).toEqual([-2, -2]);
    });

    test('scale', () => {
        const { scale } = Vec2Js;
        expect(scale([0, 0.5], 2)).toEqual([0, 1]);
        expect(scale([1, 2], 3)).toEqual([3, 6]);
        expect(scale(3)([1, 2])).toEqual([3, 6]);
    });

    test('dot', () => {
        const { dot } = Vec2Js;
        expect(dot([0, 0], [0, 0])).toEqual(0);
        expect(dot([1, 2], [0, 0])).toEqual(0);
        expect(dot([0, 0], [1, 2])).toEqual(0);
        expect(dot([1, 2], [3, 4])).toEqual(11);
        expect(dot([3, 4], [1, 2])).toEqual(11);
        expect(dot([1, 2])([3, 4])).toEqual(11);
        expect(dot([3, 4])([1, 2])).toEqual(11);
    });

    test('length', () => {
        const { length } = Vec2Js;
        expect(fix(length([0, 0]))).toEqual(0);
        expect(fix(length([1, 0]))).toEqual(1);
        expect(fix(length([0, 1]))).toEqual(1);
        expect(fix(length([1, 1]))).toEqual(1.4142136);
    });

    test('normal', () => {
        const { normal } = Vec2Js;
        expect(fix(normal([3, 4]))).toEqual([0.8, -0.6]);
        expect(fix(normal([1, 0]))).toEqual([0, -1]);
        expect(fix(normal([0, -1]))).toEqual([-1, 0]);
        expect(fix(normal([-1, 0]))).toEqual([0, 1]);
        expect(fix(normal([0, 1]))).toEqual([1, 0]);
    });

    test('unit', () => {
        const { unit } = Vec2Js;
        expect(() => unit([0, 0])).toThrowError(AssertionError);
        expect(fix(unit([1, 0]))).toEqual([1, 0]);
        expect(fix(unit([0, 1]))).toEqual([0, 1]);
        expect(fix(unit([1, 1]))).toEqual([0.7071068, 0.7071068]);
    });

    test('distance', () => {
        const { distance } = Vec2Js;
        expect(fix(distance([0, 0], [0, 0]))).toEqual(0);
        expect(fix(distance([1, 1], [1, 1]))).toEqual(0);
        expect(fix(distance([0, 0], [1, 1]))).toEqual(1.4142136);
        expect(fix(distance([1, 1], [0, 0]))).toEqual(1.4142136);
        expect(fix(distance([1, 2], [3, 4]))).toEqual(2.8284271);
        expect(fix(distance([3, 4], [1, 2]))).toEqual(2.8284271);
        expect(fix(distance([1, 2])([3, 4]))).toEqual(2.8284271);
        expect(fix(distance([3, 4])([1, 2]))).toEqual(2.8284271);
    });

    test('angle', () => {
        const { angle } = Vec2Js;
        expect(() => angle([0, 0], [0, 0])).toThrowError(AssertionError);
        expect(() => angle([0, 0], [1, 0])).toThrowError(AssertionError);
        expect(() => angle([1, 0], [0, 0])).toThrowError(AssertionError);
        expect(fix(angle([1, 1], [1, 1]))).toEqual(0);
        expect(fix(angle([1, 0], [1, 1]))).toEqual(0.7853982);
        expect(fix(angle([1, 1], [1, 0]))).toEqual(0.7853982);
        expect(fix(angle([1, 0])([1, 1]))).toEqual(0.7853982);
        expect(fix(angle([1, 1])([1, 0]))).toEqual(0.7853982);
    });

    test('rotate', () => {
        const { rotate } = Vec2Js;
        expect(fix(rotate([0, 0], 0))).toEqual([0, 0]);
        expect(fix(rotate([0, 0], Math.PI))).toEqual([0, 0]);
        expect(fix(rotate([1, 0], 0))).toEqual([1, 0]);
        expect(fix(rotate([1, 0], Math.PI / 2))).toEqual([0, 1]);
        expect(fix(rotate([1, 0], Math.PI))).toEqual([-1, 0]);
        expect(fix(rotate([1, 0], Math.PI * 1.5))).toEqual([-0, -1]);
        expect(fix(rotate([1, 0], Math.PI * 2))).toEqual([1, -0]);
        expect(fix(rotate(Math.PI / 2)([1, 0]))).toEqual([0, 1]);
        expect(fix(rotate(Math.PI)([1, 0]))).toEqual([-1, 0]);
        expect(fix(rotate(Math.PI * 1.5)([1, 0]))).toEqual([-0, -1]);
        expect(fix(rotate(Math.PI * 2)([1, 0]))).toEqual([1, -0]);
    });

    test('project', () => {
        const { project } = Vec2Js;
        expect(() => project([1, 0], [0, 0])).toThrowError(AssertionError);
        expect(project([0, 0], [1, 0])).toEqual([0, 0]);
        expect(project([1, 0], [1, 0])).toEqual([1, 0]);
        expect(project([1, 0], [0, 1])).toEqual([0, 0]);
        expect(project([1, 1], [1, 0])).toEqual([1, 0]);
        expect(project([1, 1], [0, 1])).toEqual([0, 1]);
        expect(project([1, 0], [1, 1])).toEqual([0.5, 0.5]);
        expect(project([1, 0], [-1, -1])).toEqual([0.5, 0.5]);
        expect(project([1, 0], [1, -1])).toEqual([0.5, -0.5]);
        expect(project([1, 0], [-1, 1])).toEqual([0.5, -0.5]);
        expect(project([1, 1])([1, 0])).toEqual([0.5, 0.5]);
        expect(project([-1, -1])([1, 0])).toEqual([0.5, 0.5]);
        expect(project([1, -1])([1, 0])).toEqual([0.5, -0.5]);
        expect(project([-1, 1])([1, 0])).toEqual([0.5, -0.5]);
    });

});