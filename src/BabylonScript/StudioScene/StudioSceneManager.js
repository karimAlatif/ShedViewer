import * as BABYLON from "babylonjs";
import * as BABYLONMaterials from "babylonjs-materials";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import "pepjs";
import "babylonjs-loaders";

import * as studioModules from "../StudioScene/StudioSceneModules";
import LoaderManager from "./LoaderManager";

export default class StudioSceneManager {
  constructor(game) {
    this.game = game;
    //Main Props
    this.scene = null;
    this.studioGui = null;
    this.arcCamera = null;
    this.mainCamera = null;
    this.pipline = null;

    //Input Manager
    this.InputMg = {
      isDragging: false,
      startPoint: null,
      currentTouchedMesh: null,
      currentSelectedMesh: null,
      MeshIndex: 0,
      dragLimitation: null,
      currentMeshDevOpts: null,
    };
    this.snapValue = 5.5;

    //Val's
    this.IsComponentTab = false;
  }

  //#region  MainSceneProperties
  CreateScene(onFinish, sockData) {
    //Create Bts Scene
    //Create Scene
    this.scene = new BABYLON.Scene(this.game.engine);
    this.scene.clearColor = new BABYLON.Color4(39 / 255, 41 / 255, 73 / 255, 1);
    // this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    // this.scene.imageProcessingConfiguration.colorCurves = new BABYLON.ColorCurves();
    // this.scene.imageProcessingConfiguration.colorCurves.globalSaturation = 0;
    this.scene.imageProcessingConfiguration.contrast = 2.35;
    this.scene.imageProcessingConfiguration.vignetteEnabled = true;

    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          // this.onPointerDown(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          // this.onPointerUp(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          // this.onPointerMove(pointerInfo.event);
          break;
        case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
          this.scene.activeCamera = this.mainCamera;
          this.mainCamera.attachControl(this.game.canvas, true);
          break;
        case BABYLON.PointerEventTypes.POINTERWHEEL:
          // this.MouseWheelHandler();
          break;
        default:
          break;
      }
    });

    //Installation
    this.createCamera();
    this.setUpEnvironMent();

    //Create LoadManager instance
    this.loaderManager = new LoaderManager(this);
    this.loaderManager.loadMainMesh(); //start load main mesh
    // this.scene.debugLayer.show();

    //
    return this.scene;
  }
  createCamera() {
    this.arcCamera = new BABYLON.ArcRotateCamera(
      "ArcCamera",
      2.7,
      1.4,
      50,
      new BABYLON.Vector3(-12, 2.0, -8.5),
      this.scene
    );
    this.arcCamera.attachControl(this.game.canvas, true);

    this.arcCamera.lowerRadiusLimit = 2.5;
    this.arcCamera.upperRadiusLimit = 85;

    this.arcCamera.lowerBetaLimit = 0.85;
    this.arcCamera.upperBetaLimit = 1.5;

    this.arcCamera.minZ = 0.2;
    // this.mainCamera.target = new BABYLON.Vector3(0, 6.3, -0.7);

    this.arcCamera.wheelPrecision = 10;
    this.arcCamera.useBouncingBehavior = true;


    this.mainCamera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(-8.5, 1.8, 13),
      this.scene
    );
    this.mainCamera.rotation.y = Math.PI;

    this.mainCamera.checkCollisions = true;
    this.mainCamera.speed = 0.175;
    this.mainCamera.minZ = 0.5;
    this.mainCamera.fov = 1.3;
    //Controls  WASD
    this.mainCamera.keysUp.push(87);
    this.mainCamera.keysDown.push(83);
    this.mainCamera.keysRight.push(68);
    this.mainCamera.keysLeft.push(65);
    //
    this.mainCamera.ellipsoid = new BABYLON.Vector3(.3, .85, .3);
    this.mainCamera.applyGravity = true;

  }
  setUpEnvironMent() {
    let dirLight = new BABYLON.DirectionalLight(
      "DirectionalLight",
      new BABYLON.Vector3(0, -1, 0.3),
      this.scene
    );
    dirLight.position = new BABYLON.Vector3(3, 9, 3);

    this.alphaMaterial = new BABYLON.StandardMaterial("alphaMat", this.scene);
    this.alphaMaterial.alpha = 0;


    //Create CubicTexture
    let skyboxCubecTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "https://assets.babylonjs.com/environments/environmentSpecular.env",
      this.scene
    );
    this.scene.environmentTexture = skyboxCubecTexture;
  }
  //#endregion

  //#region UserInput (Mouse)
  onPointerDown(ev) {
  }
  onPointerUp(ev) {
  }
  onPointerMove(ev) { }
  //#endregion
}
