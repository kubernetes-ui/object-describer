window.EXAMPLE_POD = {
  "kind": "Pod",
  "apiVersion": "v1beta3",
  "metadata": {
    "name": "example-pod",
    "namespace": "test",
    "selfLink": "/api/v1beta3/namespaces/test/pods/example-pod",
    "uid": "6aefeebf-d7d2-11e4-a675-54ee75107c12",
    "resourceVersion": "20060",
    "creationTimestamp": "2015-03-31T18:19:06Z",
    "labels": {
      "name": "example-pod"
    }
  },
  "spec": {
    "volumes": [
      {
        "name": "docker-socket",
        "hostPath": {
          "path": "/var/run/docker.sock"
        },
        "emptyDir": null,
        "gcePersistentDisk": null,
        "gitRepo": null,
        "secret": null,
        "nfs": null
      }
    ],
    "containers": [
      {
        "name": "example-pod",
        "image": "openshift/hello-openshift",
        "ports": [
          {
            "containerPort": 8080,
            "protocol": "TCP"
          }
        ],
        "resources": {},
        "terminationMessagePath": "/dev/termination-log",
        "imagePullPolicy": "IfNotPresent",
        "capabilities": {}
      }
    ],
    "restartPolicy": "Always",
    "dnsPolicy": "ClusterFirst",
    "host": "example.node.com"
  },
  "status": {
    "phase": "Running",
    "Condition": [
      {
        "type": "Ready",
        "status": "Full"
      }
    ],
    "host": "example.node.com",
    "podIP": "1.2.3.4",
    "info": {
      "example-pod": {
        "state": {
          "running": {
            "startedAt": null
          }
        },
        "ready": true,
        "restartCount": 0,
        "image": "testimage",
        "imageID": "docker://",
        "containerID": "docker:///k8s_example-pod.5bcbfd7c_example-pod_test_6aefeebf-d7d2-11e4-a675-54ee75107c12_399fd945"
      }
    }
  }
};