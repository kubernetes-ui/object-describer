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
      "deploymentVersion": "1",
      "encodedDeploymentConfig": "{\"kind\":\"DeploymentConfig\",\"apiVersion\":\"v1beta1\",\"metadata\":{\"name\":\"database\",\"namespace\":\"test\",\"selfLink\":\"/osapi/v1beta1/deploymentConfigs/database?namespace=test\",\"uid\":\"362d0590-e208-11e4-bdc4-54ee75107c12\",\"resourceVersion\":\"99\",\"creationTimestamp\":\"2015-04-13T18:09:22Z\",\"labels\":{\"template\":\"application-template-stibuild\"}},\"triggers\":[{\"type\":\"ConfigChange\"}],\"template\":{\"strategy\":{\"type\":\"Recreate\"},\"controllerTemplate\":{\"replicas\":1,\"replicaSelector\":{\"name\":\"database\"},\"podTemplate\":{\"desiredState\":{\"manifest\":{\"version\":\"v1beta2\",\"id\":\"\",\"volumes\":null,\"containers\":[{\"name\":\"ruby-helloworld-database\",\"image\":\"openshift/mysql-55-centos7\",\"ports\":[{\"containerPort\":3306,\"protocol\":\"TCP\"}],\"env\":[{\"name\":\"MYSQL_USER\",\"key\":\"MYSQL_USER\",\"value\":\"userTJW\"},{\"name\":\"MYSQL_PASSWORD\",\"key\":\"MYSQL_PASSWORD\",\"value\":\"HOtpCU67\"},{\"name\":\"MYSQL_DATABASE\",\"key\":\"MYSQL_DATABASE\",\"value\":\"root\"}],\"resources\":{},\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"PullIfNotPresent\",\"capabilities\":{}}],\"restartPolicy\":{\"always\":{}},\"dnsPolicy\":\"ClusterFirst\"}},\"labels\":{\"name\":\"database\",\"template\":\"application-template-stibuild\"}}}},\"latestVersion\":1,\"details\":{\"causes\":[{\"type\":\"ConfigChange\"}]}}"
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