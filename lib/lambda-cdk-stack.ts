import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, env: string | undefined, props?: cdk.StackProps) {
    super(scope, id, props);

    var functionName = 'HelloWorldFunction-' + env;
    var apigatewayName = 'HelloWorldApi-' + env;

    // Define the Lambda function resource
    const helloWorldFunction = new lambda.Function(this, functionName, {
      runtime: lambda.Runtime.PYTHON_3_13, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'hello.handler', // Points to the 'hello' file in the lambda directory
    });    

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