'use strict';
const FORWARD_IMPULSE = 0.45;
const MAX_VELOCITY = 30;
const MIN_TURNING_VELOCITY = 4.0;
const TURN_IMPULSE = 0.14;
const SMALL_TURNING_VELOCITY = 8.0;
const BOOST_VELOCITY = 3.0;
const DASH_MODIFIER = 0.8;
let CANNON = null;

class CarControl {

    constructor(options) {
        CANNON = options.CANNON;
    }

    accelerate(car, direction) {
        let curVel = car.physicsObj.velocity.length();
        if (curVel > MAX_VELOCITY)
            return;

        // TODO: probably bad perf
        let impulse = FORWARD_IMPULSE;
        if (direction === 'down') impulse *= -1;
        let move = this.isMovingForwards(car)?'up':'down';
        if (curVel < BOOST_VELOCITY && direction === move) impulse *= 3;
        let newVec = car.physicsObj.quaternion.vmult(new CANNON.Vec3(0, 0, impulse));

        car.physicsObj.velocity.vadd(newVec, car.physicsObj.velocity);
    }

    isMovingForwards(car) {
        let XZPlaneOrientation = car.physicsObj.quaternion.vmult(new CANNON.Vec3(0, 0, 1));
        let XZPlaneVelocity = car.physicsObj.velocity.clone();
        XZPlaneOrientation.y = 0;
        XZPlaneVelocity.y = 0;
        return XZPlaneOrientation.dot(XZPlaneVelocity) >= 0;
    }

    turn(car, direction) {

        // only turn if the car is advancing
        let curVel = car.physicsObj.velocity.length();
        if (curVel < MIN_TURNING_VELOCITY)
            return;

        let deltaAngularVelocity = car.physicsObj.quaternion.vmult(new CANNON.Vec3(0, 1, 0));
        let impulse = TURN_IMPULSE;
        if (direction === 'right') impulse *= -1;
        if (!this.isMovingForwards(car)) impulse *= -1;
        if (curVel < SMALL_TURNING_VELOCITY) impulse *= 0.6;
        deltaAngularVelocity.scale(impulse, deltaAngularVelocity);
        car.physicsObj.angularVelocity.vadd(deltaAngularVelocity, car.physicsObj.angularVelocity);
    }

    dash(car, inputData)
    {
      /*
      let impulse = inputData.options.dashSpeed;
      let newVec = car.physicsObj.quaternion.vmult(
        new CANNON.Vec3(
          inputData.options.dashVector.x,
          inputData.options.dashVector.z,
          impulse));
      */

      inputData.options.dashVector.x = inputData.options.dashVector.x * DASH_MODIFIER;
      inputData.options.dashVector.y = inputData.options.dashVector.y * DASH_MODIFIER;
      inputData.options.dashVector.z = inputData.options.dashVector.z * DASH_MODIFIER;

      let newSpeedVec = car.physicsObj.velocity.clone();
      newSpeedVec.vadd(inputData.options.dashVector, newSpeedVec);
      let newSpeedLen = newSpeedVec.length();

      let velocityRatio = (newSpeedLen - MAX_VELOCITY) / MAX_VELOCITY;

      if (velocityRatio > 0)
      {
        let multiplier = 1 - velocityRatio;

        inputData.options.dashVector.x = inputData.options.dashVector.x * multiplier;
        inputData.options.dashVector.y = inputData.options.dashVector.y * multiplier;
        inputData.options.dashVector.z = inputData.options.dashVector.z * multiplier;
      }

      car.physicsObj.velocity.vadd(inputData.options.dashVector, car.physicsObj.velocity);

    }
}

module.exports = CarControl;
