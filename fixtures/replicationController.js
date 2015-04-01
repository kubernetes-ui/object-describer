window.EXAMPLE_RC = {
  "kind": "ReplicationController",
  "apiVersion": "v1beta3",
  "metadata": {
    "name": "database-1",
    "namespace": "test",
    "selfLink": "/api/v1beta3/namespaces/test/replicationcontrollers/database-1",
    "uid": "4ee3fd17-d3e7-11e4-92f6-54ee75107c12",
    "resourceVersion": "22681",
    "creationTimestamp": "2015-03-26T18:38:34Z",
    "labels": {
      "template": "my-template"
    },
    "annotations": {
      "deploymentConfig": "database",
      "deploymentStatus": "Complete",
      "deploymentVersion": "1"
    }
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "deployment": "database-1",
      "deploymentconfig": "database",
      "name": "database"
    },
    "template": {
      "metadata": {
        "creationTimestamp": null,
        "labels": {
          "deployment": "database-1",
          "deploymentconfig": "database",
          "name": "database",
          "template": "my-template"
        },
        "annotations": {
          "deployment": "database-1",
          "deploymentConfig": "database",
          "deploymentVersion": "1"
        }
      },
      "spec": {
        "volumes": null,
        "containers": [
          {
            "name": "helloworld-database",
            "image": "mysql",
            "ports": [
              {
                "containerPort": 3306,
                "protocol": "TCP"
              }
            ],
            "env": [
              {
                "name": "MYSQL_USER",
                "value": "userC06"
              },
              {
                "name": "MYSQL_PASSWORD",
                "value": "JuYjxiAt"
              },
              {
                "name": "MYSQL_DATABASE",
                "value": "root"
              }
            ],
            "resources": {},
            "terminationMessagePath": "/dev/termination-log",
            "imagePullPolicy": "IfNotPresent",
            "capabilities": {}
          }
        ],
        "restartPolicy": "Always",
        "dnsPolicy": "ClusterFirst"
      }
    }
  },
  "status": {
    "replicas": 1
  }
};