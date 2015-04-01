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
    "port": 5434,
    "protocol": "TCP",
    "selector": {
      "name": "database"
    },
    "portalIP": "172.30.17.6",
    "containerPort": 3306,
    "sessionAffinity": "None"
  },
  "status": {}
};