import * as gs from "./gs-json";


export let box: gs.IModelData = {
    "metadata": {
        "filetype":"mobius",
        "version": 0.1,
        "crs": {"epsg":3857},
        "location": "+40.6894-074.0447" 
    },
    "points":[
        [0, 1, 2, 3, 4, 5, 6, 7],
        [
            [-0.7794438004493713, -1.0, 0.0], 
            [0.22055619955062866, -1.0, 0.0], 
            [0.22055619955062866, -1.0, 3.0], 
            [-0.7794438004493713, -1.0, 3.0], 
            [-0.7794438004493713, 1.0, 0.0], 
            [0.22055619955062866, 1.0, 0.0], 
            [0.22055619955062866, 1.0, 3.0], 
            [-0.7794438004493713, 1.0, 3.0]
        ]
    ],
    "objects":[
        [
            [[0, 1, 2, 3, -1]],
            [[1, 5, 4, 0, -1], [2, 6, 5, 1, -1], [3, 7, 6, 2, -1], [0, 4, 7, 3, -1], [5, 6, 7, 4, -1]],
            [200]
        ]
    ]
}

