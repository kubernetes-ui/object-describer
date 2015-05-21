window.EXAMPLE_SERVICE = {
  "kind": "Service",
  "apiVersion": "v1beta3",
  "metadata": {
    "name": "database",
    "namespace": "test",
    "selfLink": "/api/v1beta3/namespaces/test/services/database",
    "uid": "4ed21ab1-d3e7-11e4-92f6-54ee75107c12",
    "resourceVersion": "102",
    "creationTimestamp": "2015-03-26T18:38:34Z",
    "labels": {
      "template": "my-template"
    }
  },
  "spec": {
    "ports": [
      {
        "name": "",
        "protocol": "TCP",
        "port": 5434,
        "targetPort": 3306
      },
      {
        "name": "three",
        "protocol": "UDP",
        "port": 5436,
        "targetPort": 3308
      },
      {
        "name": "two",
        "protocol": "TCP",
        "port": 5435,
        "targetPort": 3307
      }
    ],
    "selector": {
      "name": "database"
    },
    "portalIP": "172.30.17.6",
    "sessionAffinity": "None"
  },
  "status": {}
};

window.EXAMPLE_HEADLESS_SERVICE = {
  "kind": "Service",
  "apiVersion": "v1beta3",
  "metadata": {
    "name": "headless",
    "namespace": "test",
    "selfLink": "/api/v1beta3/namespaces/test/services/headless",
    "uid": "16e6dee1-e922-11e4-894c-0296ae7c2489",
    "resourceVersion": "102",
    "creationTimestamp": "2015-04-22T19:02:15Z",
    "labels": {
      "template": "my-template"
    }
  },
  "spec": {
    "ports": [],
    "selector": {
      "name": "headless"
    },
    "portalIP": "None",
    "sessionAffinity": "None"
  },
  "status": {}
};
