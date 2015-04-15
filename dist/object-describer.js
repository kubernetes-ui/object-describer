'use strict';

try { angular.module("kubernetesUI") } catch(e) { angular.module("kubernetesUI", []) }

angular.module('kubernetesUI')
.factory('KubernetesObjectDescriber', [function() {
  function KubernetesObjectDescriber() {
    this.kinds = {
      "Pod" : {
        templateUrl: "views/pod.html"
      },
      "Service" : {
        templateUrl: "views/service.html"
      },
      "ReplicationController" : {
        templateUrl: "views/replication-controller.html"
      }  
    };
  }

  KubernetesObjectDescriber.prototype.registerKind = function(kind, templateUrl, overwrite) {
    if (this.kinds[kind] && !overwrite) {
      throw "KubernetesObjectDescriber.registerKind :: kind " + kind + " is already registered."
    }
    if (!templateUrl) {
      throw "KubernetesObjectDescriber.registerKind :: templateUrl is required."
    }
    this.kinds[kind] = {
      templateUrl: templateUrl
    };
  };

  KubernetesObjectDescriber.prototype.templateUrlForKind = function(kind) {
    if (kind && this.kinds[kind]) {
      return this.kinds[kind].templateUrl;
    }
    return 'views/default-describer.html';
  };

  return new KubernetesObjectDescriber();
}])
.directive("kubernetesObjectDescriber", function(KubernetesObjectDescriber, $templateCache, $compile) {
  return {
    restrict: 'E',
    scope: {
      resource: '=',
      kind: '@',
      moreDetailsLink: '@'
    },
    link: function(scope, element, attrs) {
      // TODO test this for any potential XSS vulnerabilities
      var templateUrl = KubernetesObjectDescriber.templateUrlForKind(scope.kind);
      element.html($templateCache.get(templateUrl));
      $compile(element.contents())(scope);
    }
  }
})
.directive("kubernetesObjectDescribeLabels", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/labels.html'
  }
})
.directive("kubernetesObjectDescribeAnnotations", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/annotations.html'
  }
})
.directive("kubernetesObjectDescribeMetadata", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/metadata.html'
  }
})
.directive("kubernetesObjectDescribeHeader", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '=',
      kind: '='
    },
    templateUrl: 'views/header.html'
  }
})
.directive("kubernetesObjectDescribeFooter", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/footer.html'
  }
})
.directive("kubernetesObjectDescribePodTemplate", function() {
  return {
    restrict: 'E',
    scope: {
      template: '='
    },
    templateUrl: 'views/pod-template.html'
  }
})
.directive("kubernetesObjectDescribeVolumes", function() {
  return {
    restrict: 'E',
    scope: {
      volumes: '='
    },
    templateUrl: 'views/volumes.html'
  }
})
.directive("kubernetesObjectDescribeContainers", function() {
  return {
    restrict: 'E',
    scope: {
      containers: '='
    },
    templateUrl: 'views/containers.html'
  }
});
angular.module('kubernetesUI').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/annotations.html',
    "  <h3>Annotations</h3>\n" +
    "  <span ng-if=\"!resource.metadata.annotations\"><em>none</em></span>\n" +
    "  <dl class=\"dl-horizontal\" ng-if=\"resource.metadata.annotations\">\n" +
    "    <dt ng-repeat-start=\"(annotationKey, annotationValue) in resource.metadata.annotations\">{{annotationKey}}</dt>\n" +
    "    <dd ng-repeat-end>{{annotationValue}}</dd>\n" +
    "  </dl>"
  );


  $templateCache.put('views/containers.html',
    "<div ng-if=\"!containers.length\"><em>none</em></div>\n" +
    "<dl class=\"dl-horizontal\" ng-repeat=\"container in containers\">\n" +
    "<dt>Name</dt>\n" +
    "<dd>{{container.name}}</dd>\n" +
    "<dt>Image</dt>\n" +
    "<dd>{{container.image}}</dd>\n" +
    "<dt ng-if-start=\"!container.ports.length\">Port(s)</dt>\n" +
    "<dd ng-if-end><em>none</em></dd>\n" +
    "<dt ng-repeat-start='port in container.ports'><span ng-if=\"$index == 0\">Port(s)</span></dt>\n" +
    "<dd ng-repeat-end>{{port.containerPort}}/{{port.protocol}}<span ng-if=\"port.hostPort\"> to host port {{port.hostPort}}</span></dd>\n" +
    "<dt ng-if-start=\"!container.env.length\">Env var(s)</dt>\n" +
    "<dd ng-if-end><em>none</em></dd>\n" +
    "<dt ng-repeat-start='env in container.env'><span ng-if=\"$index == 0\">Env var(s)</span></dt>\n" +
    "<dd ng-repeat-end>{{env.name}}={{env.value}}</dd>\n" +
    "</dl>\n" +
    "<div ng-if=\"$index != 0\" style=\"margin-bottom: 10px;\"></div>"
  );


  $templateCache.put('views/default-describer.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <kubernetes-object-describe-metadata resource=\"resource\"></kubernetes-object-describe-metadata>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>"
  );


  $templateCache.put('views/footer.html',
    "<div style=\"margin-top: 10px;\">\n" +
    "  <a ng-if=\"moreDetailsLink\" href=\"{{moreDetailsLink}}\">More details...</a>  \n" +
    "</div>"
  );


  $templateCache.put('views/header.html',
    "<h3>{{kind || resource.kind || 'Resource'}}</h3>"
  );


  $templateCache.put('views/labels.html',
    "<h3>Labels</h3>\n" +
    "<span ng-if=\"!resource.metadata.labels\"><em>none</em></span>\n" +
    "<dl class=\"dl-horizontal\" ng-if=\"resource.metadata.labels\">\n" +
    "  <dt ng-repeat-start=\"(labelKey, labelValue) in resource.metadata.labels\">{{labelKey}}</dt>\n" +
    "  <dd ng-repeat-end>{{labelValue}}</dd>\n" +
    "</dl>"
  );


  $templateCache.put('views/metadata.html',
    "<dl class=\"dl-horizontal\">\n" +
    "  <dt>Name</dt>\n" +
    "  <dd>{{resource.metadata.name}}</dd>\n" +
    "  <dt>Namespace</dt>\n" +
    "  <dd>{{resource.metadata.namespace}}</dd>\n" +
    "  <dt>Created</dt>\n" +
    "  <dd>{{resource.metadata.creationTimestamp}}</dd>    \n" +
    "</dl>\n" +
    "<kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "<kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>"
  );


  $templateCache.put('views/pod-template.html',
    "<h3>Pod Template</h3>\n" +
    "<dl class=\"dl-horizontal\">\n" +
    "  <dt>Restart policy</dt>\n" +
    "  <dd>{{template.restartPolicy}}</dd>\n" +
    "  <dt>DNS policy</dt>\n" +
    "  <dd>{{template.dnsPolicy}}</dd>\n" +
    "</dl>  \n" +
    "<h4>Containers</h4>\n" +
    "<kubernetes-object-describe-containers containers=\"template.containers\"></kubernetes-object-describe-containers>\n" +
    "<h4>Volumes</h4>\n" +
    "<kubernetes-object-describe-volumes volumes=\"template.volumes\"></kubernetes-object-describe-volumes> "
  );


  $templateCache.put('views/pod.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp}}</dd>\n" +
    "    <dt>Restart policy</dt>\n" +
    "    <dd>{{resource.spec.restartPolicy}}</dd>    \n" +
    "  </dl>\n" +
    "  <h3>Status</h3>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Phase</dt>\n" +
    "    <dd>{{resource.status.phase}}</dd>\n" +
    "    <dt>Node</dt>\n" +
    "    <dd>{{resource.status.host}}</dd>\n" +
    "    <dt>IP on node</dt>\n" +
    "    <dd>{{resource.status.podIP}}</dd>    \n" +
    "  </dl>\n" +
    "  <h3>Containers</h3>\n" +
    "  <kubernetes-object-describe-containers containers=\"resource.spec.containers\"></kubernetes-object-describe-containers>  \n" +
    "  <h3>Volumes</h3>\n" +
    "  <kubernetes-object-describe-volumes volumes=\"resource.spec.volumes\"></kubernetes-object-describe-volumes>\n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>"
  );


  $templateCache.put('views/replication-controller.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp}}</dd>\n" +
    "    <dt>Replicas</dt>\n" +
    "    <dd>{{resource.spec.replicas}}</dd>\n" +
    "  </dl>\n" +
    "  <h3>Selector</h3>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt ng-repeat-start=\"(selectorKey, selectorValue) in resource.spec.selector\">{{selectorKey}}</dt>\n" +
    "    <dd ng-repeat-end>{{selectorValue}}</dd>\n" +
    "  </dl>\n" +
    "  <kubernetes-object-describe-pod-template template=\"resource.spec.template.spec\"></kubernetes-object-describe-pod-template>\n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>"
  );


  $templateCache.put('views/service.html',
    "<div>\n" +
    "  <kubernetes-object-describe-header resource=\"resource\" kind=\"kind\"></kubernetes-object-describe-header>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt>Name</dt>\n" +
    "    <dd>{{resource.metadata.name}}</dd>\n" +
    "    <dt>Namespace</dt>\n" +
    "    <dd>{{resource.metadata.namespace}}</dd>\n" +
    "    <dt>Created</dt>\n" +
    "    <dd>{{resource.metadata.creationTimestamp}}</dd>\n" +
    "    <dt>IP</dt>\n" +
    "    <dd>{{resource.spec.portalIP}}</dd>\n" +
    "    <dt>Port</dt>\n" +
    "    <dd>{{resource.spec.port}}</dd>    \n" +
    "    <dt>Container port</dt>\n" +
    "    <dd>{{resource.spec.containerPort}}</dd>\n" +
    "    <dt>Protocol</dt>\n" +
    "    <dd>{{resource.spec.protocol}}</dd>\n" +
    "    <dt>Session affinity</dt>\n" +
    "    <dd>{{resource.spec.sessionAffinity}}</dd>    \n" +
    "  </dl>\n" +
    "  <h3>Selector</h3>\n" +
    "  <dl class=\"dl-horizontal\">\n" +
    "    <dt ng-repeat-start=\"(selectorKey, selectorValue) in resource.spec.selector\">{{selectorKey}}</dt>\n" +
    "    <dd ng-repeat-end>{{selectorValue}}</dd>\n" +
    "  </dl>\n" +
    "  <kubernetes-object-describe-labels resource=\"resource\"></kubernetes-object-describe-labels>\n" +
    "  <kubernetes-object-describe-annotations resource=\"resource\"></kubernetes-object-describe-annotations>\n" +
    "  <kubernetes-object-describe-footer resource=\"resource\"></kubernetes-object-describe-footer>\n" +
    "</div>"
  );


  $templateCache.put('views/volumes.html',
    "<div ng-if=\"!volumes.length\"><em>none</em></div>\n" +
    "<dl class=\"dl-horizontal\" ng-repeat=\"volume in volumes\">\n" +
    "<dt>Name</dt>\n" +
    "<dd>{{volume.name}}</dd>\n" +
    "<!-- Type = host path -->\n" +
    "<dt ng-if-start=\"volume.hostPath\">Type</dt>\n" +
    "<dd>host path</dd>\n" +
    "<dt>Path</dt>\n" +
    "<dd ng-if-end>{{volume.hostPath.path}}</dd>\n" +
    "<!-- Type = empty dir -->\n" +
    "<dt ng-if-start=\"volume.emptyDir\">Type</dt>\n" +
    "<dd ng-if-end>empty directory</dd>\n" +
    "<!-- Type = GCE persistent disk - TODO fill out details -->\n" +
    "<dt ng-if-start=\"volume.gcePersistentDisk\">Type</dt>\n" +
    "<dd ng-if-end>GCE persistent disk</dd>\n" +
    "<!-- Type = git repo -->\n" +
    "<dt ng-if-start=\"volume.gitRepo\">Type</dt>\n" +
    "<dd>Git repository</dd>\n" +
    "<dt>Repository</dt>\n" +
    "<dd>{{volume.gitRepo.repository}}</dd>\n" +
    "<dt>Revision</dt>\n" +
    "<dd ng-if-end>\n" +
    "  <span ng-if=\"volume.gitRepo.revision\">{{volume.gitRepo.revision}}</span>\n" +
    "  <span ng-if=\"!volume.gitRepo.revision\"><em>not specified</em></span>\n" +
    "</dd>\n" +
    "</dl>"
  );

}]);
