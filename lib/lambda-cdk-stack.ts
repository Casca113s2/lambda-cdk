import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, env: string | undefined, props?: cdk.StackProps) {
    super(scope, id, props);

    var functionName = 'HelloWorldFunction-' + env;
    var apigatewayName = 'HelloWorldApi-' + env;

    const layerArn = 'arn:aws:lambda:ap-southeast-1:259642033136:layer:lodashNodeJsLayer:1';
    const layer = lambda.LayerVersion.fromLayerVersionArn(this, "functionName", layerArn);

    const helloWorldFunction = new NodejsFunction(this, functionName, {
      entry: "lambda/hello.ts",
      handler: "handler",
      memorySize: 128,
      runtime: lambda.Runtime.NODEJS_20_X,
      layers: [layer],
      bundling: {
        externalModules: [
          'lodash'
        ]
      }
    })

  // Define the API Gateway resource
  const api = new apigateway.LambdaRestApi(this, apigatewayName, {
    handler: helloWorldFunction,
    proxy: false,
  });

  // Define the '/hello' resource with a GET method
  const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET');
}
}