import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export default class LoaderManager {
  constructor(sceneManager) {
    this.game = sceneManager.game;
    this.scene = sceneManager.scene;
    this.mirror = sceneManager.mirror;
    this.shadowGenerator = sceneManager.shadowGenerator;
    this.alphaMaterial = sceneManager.alphaMaterial;
    this.bikeMesh = null;
  }

  loadMainMesh() {
    //Create Bts Scene

    let assetsManager = new BABYLON.AssetsManager(this.scene);
    let bike_task = assetsManager.addMeshTask(
      "task",
      "",
      "./models/shed/",
      "NewScene1.babylon"
    );

    bike_task.onSuccess = (task) => {
      //Test --On Mesh Success
      // this.glassMat = this.scene.getMaterialByName("alpha_parts_DIFF_w_ALPHA");

      for (let j = 0; j < task.loadedMeshes.length; j++) {
        let mesh = task.loadedMeshes[j];
        switch (mesh.name) {
          case "ground":
            mesh.material = this.alphaMaterial;
            break;
          default:
            break;
        }

        if (mesh.material) {
          //if it's mesh
          switch (mesh.material.name) {
            case "Clear Glass":
            case "Glass":
            case "Default material":
              mesh.material.alpha = .65;
              mesh.material.transparencyMode = 2;
              break;
            default:
              break;
          }
          mesh.material.environmentIntensity = .85;
        }
      }

      // this.glassMat = this.scene.getMaterialByName("alpha_parts_DIFF_w_ALPHA");


    };

    assetsManager.onProgress = (
      remainingCount,
      totalCount,
      lastFinishedTask
    ) => {
      this.game.engine.loadingUIText =
        "loading Assets " +
        remainingCount +
        " out of " +
        totalCount +
        " items still need to be loaded.";
    };

    assetsManager.onFinish = (tasks) => {
      //On ALL Done

    };
    // Start loading
    assetsManager.load();
  }
}

// for (let j = 0; j < task.loadedMeshes.length; j++) {
//     console.log(task.loadedMeshes[j].name, "   ", j);
// }
