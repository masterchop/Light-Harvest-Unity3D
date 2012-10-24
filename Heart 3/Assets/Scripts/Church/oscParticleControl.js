public var min_size : float;
public var osc_address_min_size : String;
public var max_size : float;
public var osc_address_max_size : String;
private var min_org : float;
private var max_org : float;

public var world_velocity : Vector3;
public var osc_address_world_x: String;
public var osc_address_world_y: String;
public var osc_address_world_z: String;
private var world_org : Vector3;

public var local_velocity : Vector3;
public var osc_address_local_x: String;
public var osc_address_local_y: String;
public var osc_address_local_z: String;
private var local_org : Vector3;

public var angular_velocity : float;
public var osc_address_angular: String;
private var angular_org : float;

public var max_emission : float;
public var osc_address_max_emit: String;
private var max_emit_org : float;

public var particleForce : Vector3;
public var osc_address_force_x: String;
public var osc_address_force_y: String;
public var osc_address_force_z: String;
private var force_org : Vector3;

public var size_grow : float;
public var osc_address_size_grow : String;
private var size_grow_org: float;

public var emitOn : boolean = true;
public var osc_address_emit : String;

public var hue : float;



var emitter : ParticleEmitter;
var animator : ParticleAnimator;



function Start(){
	emitter = gameObject.GetComponent(ParticleEmitter);
	animator = gameObject.GetComponent(ParticleAnimator);
	
	min_org = emitter.minSize;
	max_org = emitter.maxSize;
	world_org = emitter.worldVelocity;
	local_org = emitter.localVelocity;
	angular_org = emitter.angularVelocity;
	force_org = animator.force;
	max_emit_org = emitter.maxEmission;
	size_grow_org = animator.sizeGrow;
	
	min_size = emitter.minSize;
	max_size = emitter.maxSize;
	world_velocity = emitter.worldVelocity;
	local_velocity = emitter.localVelocity;
	angular_velocity = emitter.angularVelocity;
	particleForce = animator.force;
	max_emission = emitter.maxEmission;
	size_grow = animator.sizeGrow;
	

	
	
	
}

function Update () {
	
	size_grow = Mathf.Clamp(size_grow, 0, 1);
	emitter = gameObject.GetComponent(ParticleEmitter);
	animator = gameObject.GetComponent(ParticleAnimator);
	
	emitter.minSize = min_size;
	emitter.maxSize = max_size;
	emitter.worldVelocity = world_velocity;
	emitter.localVelocity = local_velocity;
	emitter.angularVelocity = angular_velocity;
	animator.force = particleForce;
	
	emitter.emit = emitOn;
	
	animator.sizeGrow = size_grow;
	hue = Mathf.Clamp(hue,0,1);
	if(renderer.material.HasProperty("_TintColor")){
		oldColor = renderer.material.GetColor("_TintColor");
		var oldHSBTint : HSBColor;
		oldHSB = HSBColor(oldColor);	
		oldHSB.h = hue;
		renderer.material.SetColor("_TintColor", HSBColor.ToColor(oldHSB));
	}
	else if(renderer.material.HasProperty("_Color")){
		oldColor = renderer.material.GetColor("_Color");
		var oldHSBMain : HSBColor;
		oldHSB = HSBColor(oldColor);	
		oldHSB.h = hue;
		renderer.material.SetColor("_Color", HSBColor.ToColor(oldHSB));
	}
	
	
	//renderer.material.color = HSBColor.ToColor(oldHSB);
	
	//renderer.material.SetColor("_TintColor", HSBColor.ToColor(oldHSB));
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);

		if(message.Address == osc_address_min_size){
			min_size = message.Values[0];
		
		}
		if(message.Address == osc_address_max_size){
			max_size = message.Values[0];
		
		}
		if(message.Address == osc_address_world_x){
			world_velocity.x = message.Values[0];
		
		}
		if(message.Address == osc_address_world_y){
			world_velocity.y = message.Values[0];
		
		}
		if(message.Address == osc_address_world_z){
			world_velocity.z = message.Values[0];
		
		}
		if(message.Address == osc_address_local_x){
			local_velocity.x = message.Values[0];
		
		}
		if(message.Address == osc_address_local_y){
			local_velocity.y= message.Values[0];
		
		}
		if(message.Address == osc_address_local_z){
			local_velocity.z = message.Values[0];
		
		}
		if(message.Address == osc_address_angular){
			angular_velocity= message.Values[0];
		
		}
		if(message.Address == osc_address_max_emit){
			max_emission = message.Values[0];
		
		}
		if(message.Address == osc_address_force_x){
			particleForce.x = message.Values[0];
		
		}
		if(message.Address == osc_address_force_y){
			particleForce.y = message.Values[0];
		
		}
		if(message.Address == osc_address_force_z){
			particleForce.z = message.Values[0];
		
		}
		if(message.Address == osc_address_size_grow){
			size_grow = message.Values[0];
		
		}
		if(message.Address == osc_address_emit){
			if(message.Values[0]==1.0){
				emitOn = !emitOn;
			}
		}
}

function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}