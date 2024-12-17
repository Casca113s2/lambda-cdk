#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaCdkStack } from '../lib/lambda-cdk-stack';

const app = new cdk.App();
var env = ((process.env.GITHUB_REF_NAME == 'master' ? 'prod' : process.env.GITHUB_REF_NAME) || 'dev');
new LambdaCdkStack(app, 'LambdaCdkStack', env, {
});