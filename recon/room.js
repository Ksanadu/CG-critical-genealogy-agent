import{$i as e,$r as t,$t as n,A as r,Aa as i,An as a,Ar as o,At as s,Ba as c,Bi as l,Bn as u,Br as d,Bt as f,Ca as p,Cn as m,Ct as h,D as g,Da as _,Dn as v,Dr as y,Dt as b,Ea as x,En as S,Er as C,Et as w,F as T,Fa as E,Fi as D,Fn as O,Fr as k,Ft as A,Gn as j,Gr as M,Gt as N,H as ee,Hi as te,Hr as ne,Ht as re,Ia as P,Ii as ie,In as F,Ir as ae,It as oe,J as se,Ji as ce,Jr as le,Jt as ue,Ka as I,Kn as de,Kr as fe,Kt as L,L as pe,La as me,Ln as he,Lr as ge,Lt as _e,Ma as ve,Mr as ye,Mt as be,N as xe,Na as Se,Nn as Ce,Nr as we,O as Te,Oa as Ee,Or as R,Ot as De,P as Oe,Pa as z,Pi as ke,Pn as Ae,Pr as je,Pt as B,Q as Me,Qn as Ne,Qt as V,R as H,Ra as Pe,Rn as Fe,Rr as Ie,Rt as Le,Sa as Re,St as ze,Ta as Be,Tn as Ve,Tr as He,Tt as Ue,Ua as We,Un as Ge,Ur as Ke,Ut as qe,V as Je,Vi as Ye,Vn as Xe,Vt as Ze,W as Qe,Wn as $e,Wr as et,Wt as U,X as tt,Xi as nt,Xr as rt,Xt as it,Yi as at,Yn as ot,Yr as st,Yt as W,Z as ct,Zi as lt,Zn as ut,Zr as dt,Zt as ft,_a as pt,_n as mt,_r as ht,_t as gt,an as _t,ar as vt,at as yt,ba as bt,bn as xt,br as St,bt as Ct,c as wt,cn as Tt,cr as Et,ct as G,d as Dt,dn as Ot,dr as kt,dt as At,ea as jt,en as Mt,er as Nt,et as K,f as Pt,fa as Ft,fr as It,ft as Lt,gn as Rt,gr as zt,ha as Bt,hn as Vt,hr as Ht,ht as Ut,ia as Wt,ii as Gt,in as Kt,ir as qt,it as Jt,j as Yt,ja as Xt,jn as Zt,jr as Qt,jt as $t,k as en,ka as tn,kn as nn,kr as rn,kt as an,l as on,la as sn,ln as cn,lr as ln,lt as un,m as dn,ma as fn,mn as pn,mr as mn,mt as hn,na as gn,nn as q,nr as _n,nt as vn,on as yn,or as bn,ot as xn,p as Sn,pa as Cn,pr as wn,pt as Tn,q as En,qn as Dn,qr as On,qt as kn,ri as An,rn as jn,rt as Mn,sn as Nn,sr as Pn,st as Fn,ta as In,tn as Ln,tr as Rn,tt as zn,u as Bn,ua as Vn,un as Hn,ur as Un,ut as Wn,vn as Gn,vr as Kn,vt as qn,wa as J,wr as Jn,wt as Yn,xa as Xn,xn as Zn,xr as Qn,xt as $n,ya as er,yn as tr,yr as nr,z as rr,za as ir,zn as ar,zr as or,zt as sr}from"./battle-ui-C33BOuNm.js";function cr(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function lr(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new S(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new C},alphaMap:{value:null},alphaMapTransform:{value:new C},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new C}},envmap:{envMap:{value:null},envMapRotation:{value:new C},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new C}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new C}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new C},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new C},normalScale:{value:new p(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new C},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new C}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new C}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new C}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new S(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new S(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new C},alphaTest:{value:0},uvTransform:{value:new C}},sprite:{diffuse:{value:new S(16777215)},opacity:{value:1},center:{value:new p(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new C},alphaMap:{value:null},alphaMapTransform:{value:new C},alphaTest:{value:0}}},ur={basic:{uniforms:me([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:me([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new S(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:me([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new S(0)},specular:{value:new S(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:me([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new S(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:me([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new S(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:me([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:me([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:me([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:me([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:me([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:me([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new C},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new C}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:me([X.common,X.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:me([X.lights,X.fog,{color:{value:new S(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};ur.physical={uniforms:me([ur.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new C},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new C},clearcoatNormalScale:{value:new p(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new C},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new C},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new C},sheen:{value:0},sheenColor:{value:new S(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new C},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new C},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new C},transmissionSamplerSize:{value:new p},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new C},attenuationDistance:{value:0},attenuationColor:{value:new S(0)},specularColor:{value:new S(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new C},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new C},anisotropyVector:{value:new p},anisotropyMap:{value:null},anisotropyMapTransform:{value:new C}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var dr={r:0,b:0,g:0},fr=new y,pr=new C;pr.set(-1,0,0,0,1,0,0,0,1);function mr(e,t,n,r,a,o){let s=new S(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),r=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?n.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,o),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let a=m(n);a&&(a.isCubeTexture||a.mapping===306)?(u===void 0&&(u=new R(new tr(1,1,1),new lt({name:`BackgroundCubeMaterial`,uniforms:i(ur.backgroundCube.uniforms),vertexShader:ur.backgroundCube.vertexShader,fragmentShader:ur.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=a,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(fr.makeRotationFromEuler(n.backgroundRotation)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(pr),u.material.toneMapped=v.getTransfer(a.colorSpace)!==at,(d!==a||f!==a.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=a,f=a.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):a&&a.isTexture&&(l===void 0&&(l=new R(new M(2,2),new lt({name:`BackgroundMaterial`,uniforms:i(ur.background.uniforms),vertexShader:ur.background.vertexShader,fragmentShader:ur.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=a,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=v.getTransfer(a.colorSpace)!==at,a.matrixAutoUpdate===!0&&a.updateMatrix(),l.material.uniforms.uvTransform.value.copy(a.matrix),(d!==a||f!==a.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=a,f=a.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(dr,E(e)),n.buffers.color.setClear(dr.r,dr.g,dr.b,r,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:y}}function hr(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function gr(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function _r(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(ir(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&ir(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function vr(e){let t=this,n=null,r=0,i=!1,a=!1,o=new et,s=new C,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var yr=4,br=6,xr=20,Sr=256,Cr=new ne,wr=new S,Tr=null,Er=0,Dr=0,Or=!1,kr=new J,Ar=new J,jr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=kr}=i;Tr=this._renderer.getRenderTarget(),Er=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Tr,Er,Dr),this._renderer.xr.enabled=Or,e.scissorTest=!1,Pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tr=this._renderer.getRenderTarget(),Er=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Ne,format:An,colorSpace:ht,depthBuffer:!1},r=Nr(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nr(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Mr(r)),this._blurMaterial=Ir(r,e,t),this._ggxMaterial=Fr(r,e,t)}return r}_compileMaterial(e){let t=new R(new Zn,e);this._renderer.compile(t,Cr)}_sceneToCubeUV(e,t,n,r,i){let a=new Ke(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(wr),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new R(new tr,new rn({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(wr),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Pr(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rr()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lr());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Pr(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Cr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-yr?n-d+yr:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Pr(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Cr),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Pr(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Cr)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Pr(t,3*l*(r>this._lodMax-yr?r-this._lodMax+yr:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Cr)}};function Mr(e){let t=[],n=[],r=e,i=e-yr+1+br;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ar.set(1,r,n):e===1?Ar.set(-n,1,-r):e===2?Ar.set(-n,r,1):e===3?Ar.set(-1,r,-n):e===4?Ar.set(-n,-1,r):Ar.set(n,r,-1),Ar.toArray(l,(e*6+t)*3)}}let u=new Zn;u.setAttribute(`position`,new xt(c,3)),u.setAttribute(`outputDirection`,new xt(l,3)),n.push(new R(u,null)),r>yr&&r--}return{lodMeshes:n,sizeLods:t}}function Nr(e,t,n){let r=new Ee(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Pr(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Fr(e,t,n){return new lt({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Sr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ir(e,t,n){return new lt({name:`SphericalGaussianBlur`,defines:{SAMPLES:xr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Lr(){return new lt({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rr(){return new lt({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Br=class extends Ee{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Zt(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new tr(5,5,5),a=new lt({name:`CubemapFromEquirect`,uniforms:i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let o=new R(r,a),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=mn),new nn(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Vr(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Br(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new jr(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new jr(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Hr(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&c(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ur(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Cn:Ft)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Wr(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Gr(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Se(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Kr(e,t,n){let r=new WeakMap,i=new Be;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let m=o.attributes.position.count*f,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let g=new Float32Array(m*h*4*u),_=new Ae(g,m,h,u);_.type=Dn,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=m*h*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new p(m,h)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function qr(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Jr={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Yr(e,t,n,r,i,a){let o=new Ee(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Zn;l.setAttribute(`position`,new de([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new de([0,2,0,0,2,0],2));let u=new ie({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new R(l,u),f=new ne(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ee(t,n,{type:Ne,depthBuffer:!1,stencilBuffer:!1}),c=new Ee(t,n,{type:Ne,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},v.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Jr[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Xr=new sn,Zr=new ar(1,1),Qr=new Ae,$r=new Ce,ei=new Zt,ti=[],ni=[],ri=new Float32Array(16),ii=new Float32Array(9),ai=new Float32Array(4);function oi(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ti[i];if(a===void 0&&(a=new Float32Array(i),ti[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function si(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ci(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function li(e,t){let n=ni[t];n===void 0&&(n=new Int32Array(t),ni[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ui(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function di(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(si(n,t))return;e.uniform2fv(this.addr,t),ci(n,t)}}function fi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(si(n,t))return;e.uniform3fv(this.addr,t),ci(n,t)}}function pi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(si(n,t))return;e.uniform4fv(this.addr,t),ci(n,t)}}function mi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(si(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ci(n,t)}else{if(si(n,r))return;ai.set(r),e.uniformMatrix2fv(this.addr,!1,ai),ci(n,r)}}function hi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(si(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ci(n,t)}else{if(si(n,r))return;ii.set(r),e.uniformMatrix3fv(this.addr,!1,ii),ci(n,r)}}function gi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(si(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ci(n,t)}else{if(si(n,r))return;ri.set(r),e.uniformMatrix4fv(this.addr,!1,ri),ci(n,r)}}function _i(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function vi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(si(n,t))return;e.uniform2iv(this.addr,t),ci(n,t)}}function yi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(si(n,t))return;e.uniform3iv(this.addr,t),ci(n,t)}}function bi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(si(n,t))return;e.uniform4iv(this.addr,t),ci(n,t)}}function xi(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Si(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(si(n,t))return;e.uniform2uiv(this.addr,t),ci(n,t)}}function Ci(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(si(n,t))return;e.uniform3uiv(this.addr,t),ci(n,t)}}function wi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(si(n,t))return;e.uniform4uiv(this.addr,t),ci(n,t)}}function Ti(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Zr.compareFunction=n.isReversedDepthBuffer()?518:515,a=Zr):a=Xr,n.setTexture2D(t||a,i)}function Ei(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||$r,i)}function Di(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ei,i)}function Oi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Qr,i)}function ki(e){switch(e){case 5126:return ui;case 35664:return di;case 35665:return fi;case 35666:return pi;case 35674:return mi;case 35675:return hi;case 35676:return gi;case 5124:case 35670:return _i;case 35667:case 35671:return vi;case 35668:case 35672:return yi;case 35669:case 35673:return bi;case 5125:return xi;case 36294:return Si;case 36295:return Ci;case 36296:return wi;case 35678:case 36198:case 36298:case 36306:case 35682:return Ti;case 35679:case 36299:case 36307:return Ei;case 35680:case 36300:case 36308:case 36293:return Di;case 36289:case 36303:case 36311:case 36292:return Oi}}function Ai(e,t){e.uniform1fv(this.addr,t)}function ji(e,t){let n=oi(t,this.size,2);e.uniform2fv(this.addr,n)}function Mi(e,t){let n=oi(t,this.size,3);e.uniform3fv(this.addr,n)}function Ni(e,t){let n=oi(t,this.size,4);e.uniform4fv(this.addr,n)}function Pi(e,t){let n=oi(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Fi(e,t){let n=oi(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ii(e,t){let n=oi(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Li(e,t){e.uniform1iv(this.addr,t)}function Ri(e,t){e.uniform2iv(this.addr,t)}function zi(e,t){e.uniform3iv(this.addr,t)}function Bi(e,t){e.uniform4iv(this.addr,t)}function Vi(e,t){e.uniform1uiv(this.addr,t)}function Hi(e,t){e.uniform2uiv(this.addr,t)}function Ui(e,t){e.uniform3uiv(this.addr,t)}function Wi(e,t){e.uniform4uiv(this.addr,t)}function Gi(e,t,n){let r=this.cache,i=t.length,a=li(n,i);si(r,a)||(e.uniform1iv(this.addr,a),ci(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Zr:Xr;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ki(e,t,n){let r=this.cache,i=t.length,a=li(n,i);si(r,a)||(e.uniform1iv(this.addr,a),ci(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||$r,a[e])}function qi(e,t,n){let r=this.cache,i=t.length,a=li(n,i);si(r,a)||(e.uniform1iv(this.addr,a),ci(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ei,a[e])}function Ji(e,t,n){let r=this.cache,i=t.length,a=li(n,i);si(r,a)||(e.uniform1iv(this.addr,a),ci(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Qr,a[e])}function Yi(e){switch(e){case 5126:return Ai;case 35664:return ji;case 35665:return Mi;case 35666:return Ni;case 35674:return Pi;case 35675:return Fi;case 35676:return Ii;case 5124:case 35670:return Li;case 35667:case 35671:return Ri;case 35668:case 35672:return zi;case 35669:case 35673:return Bi;case 5125:return Vi;case 36294:return Hi;case 36295:return Ui;case 36296:return Wi;case 35678:case 36198:case 36298:case 36306:case 35682:return Gi;case 35679:case 36299:case 36307:return Ki;case 35680:case 36300:case 36308:case 36293:return qi;case 36289:case 36303:case 36311:case 36292:return Ji}}var Xi=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ki(t.type)}},Zi=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yi(t.type)}},Qi=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},$i=/(\w+)(\])?(\[|\.)?/g;function ea(e,t){e.seq.push(t),e.map[t.id]=t}function ta(e,t,n){let r=e.name,i=r.length;for($i.lastIndex=0;;){let a=$i.exec(r),o=$i.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){ea(n,l===void 0?new Xi(s,e,t):new Zi(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Qi(s),ea(n,e)),n=e}}}var na=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);ta(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function ra(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ia=37297,aa=0;function oa(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var sa=new C;function ca(e){v._getMatrix(sa,v.workingColorSpace,e);let t=`mat3( ${sa.elements.map(e=>e.toFixed(4))} )`;switch(v.getTransfer(e)){case Kn:return[t,`LinearTransferOETF`];case at:return[t,`sRGBTransferOETF`];default:return ir(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function la(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+oa(e.getShaderSource(t),r)}return i}function ua(e,t){let n=ca(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var da={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function fa(e,t){let n=da[t];return n===void 0?(ir(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var pa=new J;function ma(){return v.getLuminanceCoefficients(pa),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${pa.x.toFixed(4)}, ${pa.y.toFixed(4)}, ${pa.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ha(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(va).join(`
`)}function ga(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function _a(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function va(e){return e!==``}function ya(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ba(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xa=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sa(e){return e.replace(xa,wa)}var Ca=new Map;function wa(e,t){let n=Y[t];if(n===void 0){let e=Ca.get(t);if(e!==void 0)n=Y[e],ir(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Sa(n)}var Ta=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ea(e){return e.replace(Ta,Da)}function Da(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Oa(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var ka={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Aa(e){return ka[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ja={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Ma(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ja[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Na={302:`ENVMAP_MODE_REFRACTION`};function Pa(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Na[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Fa={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ia(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Fa[e.combine]||`ENVMAP_BLENDING_NONE`}function La(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Ra(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Aa(n),l=Ma(n),u=Pa(n),d=Ia(n),f=La(n),p=ha(n),m=ga(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(va).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(va).join(`
`),_.length>0&&(_+=`
`)):(g=[Oa(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(va).join(`
`),_=[Oa(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:fa(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,ua(`linearToOutputTexel`,n.outputColorSpace),ma(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(va).join(`
`)),o=Sa(o),o=ya(o,n),o=ba(o,n),s=Sa(s),s=ya(s,n),s=ba(s,n),o=Ea(o),s=Ea(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=ra(i,i.VERTEX_SHADER,y),S=ra(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=la(i,x,`vertex`),n=la(i,S,`fragment`);Se(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):ir(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new na(i,h),T=_a(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ia)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=aa++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var za=0,Ba=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Va(e),t.set(e,n)),n}},Va=class{constructor(e){this.id=za++,this.code=e,this.usedTimes=0}};function Ha(e){return e===1030||e===37490||e===36285}function Ua(e,t,n,r,i,a){let o=new ln,s=new Ba,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,y=h.geometry,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,x=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,S=t.get(i.envMap||b,x),C=S&&S.mapping===306?S.image.height:null,w=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&ir(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let T=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,E=T===void 0?0:T.length,D=0;y.morphAttributes.position!==void 0&&(D=1),y.morphAttributes.normal!==void 0&&(D=2),y.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(w){let e=ur[w];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),ee=h.isInstancedMesh===!0,te=h.isBatchedMesh===!0,ne=!!i.map,re=!!i.matcap,P=!!S,ie=!!i.aoMap,F=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,I=i.anisotropy>0,de=i.clearcoat>0,fe=i.dispersion>0,L=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=I&&!!i.anisotropyMap,_e=de&&!!i.clearcoatMap,ve=de&&!!i.clearcoatNormalMap,ye=de&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,R=he&&!!i.transmissionMap,De=he&&!!i.thicknessMap,Oe=!!i.gradientMap,z=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,B=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(B=e.toneMapping);let Me={shaderID:w,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:te,batchingColor:te&&h._colorsTexture!==null,instancing:ee,instancingColor:ee&&h.instanceColor!==null,instancingMorph:ee&&h.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:v.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:re,envMap:P,envMapMode:P&&S.mapping,envMapCubeUVHeight:C,aoMap:ie,lightMap:F,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Ha(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:I,anisotropyMap:ge,clearcoat:de,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:fe,retroreflection:L,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:R,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:z,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:F&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:Ee&&m(i.specularIntensityMap.channel),transmissionMapUv:R&&m(i.transmissionMap.channel),thicknessMapUv:De&&m(i.thicknessMap.channel),alphaMapUv:z&&m(i.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(oe||I),vertexNormals:!!y.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!y.attributes.uv&&(ne||z),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||y.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:N,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:y.attributes.position!==void 0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:B,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&v.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&v.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function b(e){let t=p[e.type],n;if(t){let e=ur[t];n=fn.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r=u.get(n);return r===void 0?(r=new Ra(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function C(e){s.remove(e)}function w(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function Wa(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ga(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ka(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function qa(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ga),r.length>1&&r.sort(t||Ka),i.length>1&&i.sort(t||Ka)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ja(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new qa,e.set(t,[i])):n>=r.length?(i=new qa,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ya(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new S};break;case`SpotLight`:n={position:new J,direction:new J,color:new S,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new S,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new S,groundColor:new S};break;case`RectAreaLight`:n={color:new S,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function Xa(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Za=0;function Qa(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function $a(e){let t=new Ya,n=Xa(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new y,o=new y;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Qa);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Za++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function eo(e){let t=new $a(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function to(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new eo(e),t.set(n,[a])):r>=i.length?(a=new eo(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var no=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ro=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,io=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],ao=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],oo=new y,so=new J,co=new J;function lo(e,t,n){let r=new ot,i=new p,s=new p,c=new Be,l=new o,u=new Qt,d={},f=n.maxTextureSize,m={0:1,1:0,2:2},h=new lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new p},radius:{value:4}},vertexShader:no,fragmentShader:ro}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let _=new Zn;_.setAttribute(`position`,new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new R(_,h),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let b=this.type;this.render=function(t,n,o){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||t.length===0)return;this.type===2&&(ir(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let l=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=b!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let l=0,u=t.length;l<u;l++){let u=t[l],d=u.shadow;if(d===void 0){ir(`WebGLShadowMap:`,u,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();i.multiply(h),s.copy(d.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/h.x),i.x=s.x*h.x,d.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/h.y),i.y=s.y*h.y,d.mapSize.y=s.y));let g=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=g,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(u.isPointLight){ir(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ee(i.x,i.y,{format:ke,type:Ne,minFilter:mn,magFilter:mn,generateMipmaps:!1}),d.map.texture.name=u.name+`.shadowMap`,d.map.depthTexture=new ar(i.x,i.y,Dn),d.map.depthTexture.name=u.name+`.shadowMapDepth`,d.map.depthTexture.format=he,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ae,d.map.depthTexture.magFilter=ae}else u.isPointLight?(d.map=new Br(i.x),d.map.depthTexture=new a(i.x,er)):(d.map=new Ee(i.x,i.y),d.map.depthTexture=new ar(i.x,i.y,er)),d.map.depthTexture.name=u.name+`.shadowMap`,d.map.depthTexture.format=he,this.type===1?(d.map.depthTexture.compareFunction=g?518:515,d.map.depthTexture.minFilter=mn,d.map.depthTexture.magFilter=mn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ae,d.map.depthTexture.magFilter=ae);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let _=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();u.isPointLight!==!0&&d.updateMatrices(u,o);for(let t=0;t<_;t++){let i=d.getCamera(t);if(u.isPointLight){let e=d.camera,n=d.matrix,r=u.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),so.setFromMatrixPosition(u.matrixWorld),e.position.copy(so),co.copy(e.position),co.add(io[t]),e.up.copy(ao[t]),e.lookAt(co),e.updateMatrixWorld(),n.makeTranslation(-so.x,-so.y,-so.z),oo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(oo,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),p.viewport(c)}r=d.getFrustum(t),C(n,o,i,u,this.type)}d.isPointLightShadow!==!0&&this.type===3&&x(d,o),d.needsUpdate=!1}b=this.type,y.needsUpdate=!1,e.setRenderTarget(l,u,d)};function x(n,r){let a=t.update(v);h.defines.VSM_SAMPLES!==n.blurSamples&&(h.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ee(i.x,i.y,{format:ke,type:Ne}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),h.uniforms.shadow_pass.value=n.map.depthTexture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,h,v,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,g,v,null)}function S(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,w)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function C(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=S(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=S(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)C(c[e],i,a,o,s)}function w(e){e.target.removeEventListener(`dispose`,w);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function uo(e,t){function n(){let t=!1,n=new Be,r=null,i=new Be(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):I(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=te[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):I(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,C=null,w=null,T=new S(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,N=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ee=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),ee=ne>=1);let P=null,ie={},F=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Be().fromArray(F),se=new Be().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),_e(!1),ve(1),ue(e.CULL_FACE),he(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function I(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function L(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(I(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==D){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Se(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Se(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Se(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Se(`WebGLState: Invalid blending: `,t)}y=null,b=null,C=null,w=null,T.set(0,0,0),E=0,_=t,D=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==C||s!==w)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),_=t,D=!1}function ge(t,n){t.side===2?I(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):I(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function ve(t){t===0?I(e.CULL_FACE):(ue(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function ye(t){t!==A&&(ee&&e.lineWidth(t),A=t)}function be(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(j!==n||M!==r)&&(j=n,M=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):I(e.POLYGON_OFFSET_FILL)}function xe(t){t?ue(e.SCISSOR_TEST):I(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+N-1),P!==t&&(e.activeTexture(t),P=t)}function we(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+N-1:P);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=ie[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function R(){try{e.compressedTexImage3D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function Oe(){try{e.texSubImage3D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function B(){try{e.texImage2D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){Se(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function V(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function H(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,C=null,w=null,T=new S(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:I,bindFramebuffer:de,drawBuffers:fe,useProgram:L,setBlending:he,setMaterial:ge,setFlipSided:_e,setCullFace:ve,setLineWidth:ye,setPolygonOffset:be,setScissorTest:xe,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:R,texImage2D:B,texImage3D:Me,pixelStorei:V,getParameter:Ne,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:Ae,texStorage3D:je,texSubImage2D:De,texSubImage3D:Oe,compressedTexSubImage2D:z,compressedTexSubImage3D:ke,scissor:H,viewport:Pe,reset:Le}}function fo(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new p,u=new WeakMap,d=new Set,f,m=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function g(e,t){return h?new OffscreenCanvas(e,t):ve(`canvas`)}function _(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=g(n,a));let o=t?g(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),ir(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&ir(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];ir(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||ir(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Kn:v.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,ir(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=e.target;t.removeEventListener(`dispose`,T),D(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function E(e){let t=e.target;t.removeEventListener(`dispose`,E),A(t)}function D(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=m.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&O(e),Object.keys(i).length===0&&m.delete(n)}r.remove(e)}function O(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=m.get(i);delete a[n.__cacheKey],o.memory.textures--}function A(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let j=0;function M(){j=0}function N(){return j}function ee(e){j=e}function te(){let e=j;return e>=i.maxTextures&&ir(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),j+=1,e}function ne(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function re(t,i){let a=r.get(t);if(t.isVideoTexture&&De(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)ir(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)ir(`WebGLRenderer: Texture marked for update but image is incomplete`);else{fe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){L(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let oe={[Ye]:e.REPEAT,[Ve]:e.CLAMP_TO_EDGE,[k]:e.MIRRORED_REPEAT},se={[ae]:e.NEAREST,[Ie]:e.NEAREST_MIPMAP_NEAREST,[ge]:e.NEAREST_MIPMAP_LINEAR,[mn]:e.LINEAR,[zt]:e.LINEAR_MIPMAP_NEAREST,[Ht]:e.LINEAR_MIPMAP_LINEAR},ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function le(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&ir(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,oe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,oe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,oe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ue(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,T));let i=n.source,a=m.get(i);a===void 0&&(a={},m.set(i,a));let s=ne(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&O(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function I(e,t,n){return Math.floor(Math.floor(e/n)/t)}function de(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=I(n.start,r.width,4),c=I(t.start,r.width,4);n.start<=i+1&&a===c&&I(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function fe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ue(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=v.getPrimaries(v.workingColorSpace),r=o.colorSpace===``?null:v.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=_(o.image,!1,i.maxTextureSize);t=Oe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);le(c,o);let h,g=o.mipmaps,x=o.isVideoTexture!==!0,T=f.__version===void 0||l===!0,E=u.dataReady,D=w(o,t);if(o.isDepthTexture)m=C(o.format===Fe,o.type),T&&(x?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){x&&T&&n.texStorage2D(e.TEXTURE_2D,D,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else x?(T&&n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height),E&&de(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){x&&T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(x){if(E){if(o.layerUpdates.size>0){let t=z(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else ir(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else x?E&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{x&&T&&n.texStorage2D(e.TEXTURE_2D,D,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?ir(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):x?E&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(x){if(T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,m,t.width,t.height,t.depth),E){if(o.layerUpdates.size>0){let i=z(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)x?(T&&n.texStorage3D(e.TEXTURE_3D,D,m,t.width,t.height,t.depth),E&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(T){if(x)n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<D;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(x&&T){let t=ke(g[0]);n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(x){if(T){let r=ke(t);n.texStorage2D(e.TEXTURE_2D,D,m,r.width,r.height)}E&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function L(t,o,s){if(o.image.length!==6)return;let c=ue(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=v.getPrimaries(v.workingColorSpace),r=o.colorSpace===``?null:v.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=_(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Oe(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=S(o.internalFormat,g,x,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);le(e.TEXTURE_CUBE_MAP,o);let k;if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,C,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,g,x,i.data):g===null?ir(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=ke(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,g,x,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,g,x,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,g,x,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,g,x,i.image[t])}}}y(o)&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ee(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,T)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),le(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else re(i.depthTexture,0);let u=l.__webglTexture,d=Ee(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function _e(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,i){let a=r.get(t);n!==void 0&&pe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&_e(t)}function be(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,E);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&R(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ee(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),le(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)pe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)&&b(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),le(c,a),pe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),le(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else pe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)&&b(r),n.unbindTexture()}t.depthBuffer&&_e(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Ce=[],we=[];function Te(t){if(t.samples>0){if(R(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,we.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ce.push(l),we.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,we)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ee(e){return Math.min(i.maxSamples,e.samples)}function R(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function De(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Oe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(v.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&ir(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Se(`WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=M,this.getTextureUnits=N,this.setTextureUnits=ee,this.setTexture2D=re,this.setTexture2DArray=P,this.setTexture3D=ie,this.setTextureCube=F,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=R,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function po(e,t){function n(n,r=``){let i,a=v.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var mo=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ho=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,go=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new $e(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new lt({vertexShader:mo,fragmentShader:ho,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new R(new M(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_o=class extends Ge{constructor(e,n){super();let r=this,i=null,a=1,o=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,m=null,h=null,g=typeof XRWebGLBinding<`u`,_=new go,v={},y=n.getContextAttributes(),b=null,x=null,S=[],C=[],w=new p,T=null,E=null,D=new Ke;D.viewport=new Be;let O=new Ke;O.viewport=new Be;let k=[D,O],A=new Rt,j=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new tn,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new tn,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new tn,S[e]=t),t.getHandSpace()};function N(e){let t=C.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||o),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){i.removeEventListener(`select`,N),i.removeEventListener(`selectstart`,N),i.removeEventListener(`selectend`,N),i.removeEventListener(`squeeze`,N),i.removeEventListener(`squeezestart`,N),i.removeEventListener(`squeezeend`,N),i.removeEventListener(`end`,ee),i.removeEventListener(`inputsourceschange`,te);for(let e=0;e<S.length;e++){let t=C[e];t!==null&&(C[e]=null,S[e].disconnect(t))}j=null,M=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),m=null,f=null,d=null,i=null,x=null,se.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}r.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){a=e,r.isPresenting===!0&&ir(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,r.isPresenting===!0&&ir(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?m:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,n)),d},this.getFrame=function(){return h},this.getSession=function(){return i},this.setSession=async function(t){if(i=t,i!==null){if(b=e.getRenderTarget(),i.addEventListener(`select`,N),i.addEventListener(`selectstart`,N),i.addEventListener(`selectend`,N),i.addEventListener(`squeeze`,N),i.addEventListener(`squeezestart`,N),i.addEventListener(`squeezeend`,N),i.addEventListener(`end`,ee),i.addEventListener(`inputsourceschange`,te),y.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let t=null,r=null,o=null;y.depth&&(o=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,t=y.stencil?Fe:he,r=y.stencil?pt:er);let s={colorFormat:n.RGBA8,depthFormat:o,scaleFactor:a};d=this.getBinding(),f=d.createProjectionLayer(s),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ee(f.textureWidth,f.textureHeight,{format:An,type:Bt,depthTexture:new ar(f.textureWidth,f.textureHeight,r,void 0,void 0,void 0,void 0,void 0,void 0,t),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let t={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(i,n,t),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Ee(m.framebufferWidth,m.framebufferHeight,{format:An,type:Bt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(s),se.setContext(i),se.start(),r.isPresenting=!0,r.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=C.indexOf(n);r>=0&&(C[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=C.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=C.length){C.push(n),r=e;break}else if(C[e]===null){C[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}let ne=new J,re=new J;function P(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(i===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),A.near=O.near=D.near=t,A.far=O.far=D.far=n,(j!==A.near||M!==A.far)&&(i.updateRenderState({depthNear:A.near,depthFar:A.far}),j=A.near,M=A.far),A.layers.mask=e.layers.mask|6,D.layers.mask=A.layers.mask&-5,O.layers.mask=A.layers.mask&-3;let r=e.parent,a=A.cameras;ie(A,r);for(let e=0;e<a.length;e++)ie(a[e],r);a.length===2?P(A,D,O):A.projectionMatrix.copy(D.projectionMatrix),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),F(e,A,r)};function F(e,n,r){r===null?e.matrix.copy(n.matrixWorld):(e.matrix.copy(r.matrixWorld),e.matrix.invert(),e.matrix.multiply(n.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(n.projectionMatrix),e.projectionMatrixInverse.copy(n.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=t*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(f!==null||m!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(e){return v[e]};let ae=null;function oe(t,n){if(u=n.getViewerPose(l||o),h=n,u!==null){let t=u.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let n=!1;t.length!==A.cameras.length&&(A.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(m!==null)a=m.getViewport(i);else{let t=d.getViewSubImage(f,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=k[r];o===void 0&&(o=new Ke,o.layers.enable(r),o.viewport=new Be,k[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),n===!0&&A.cameras.push(o)}let a=i.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&i.depthUsage==`gpu-optimized`&&g){d=r.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,i.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=r.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new $e,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=C[e],r=S[e];t!==null&&r!==void 0&&r.update(t,n,l||o)}ae&&ae(t,n),n.detectedPlanes&&r.dispatchEvent({type:`planesdetected`,data:n}),h=null}let se=new cr;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},vo=new y,yo=new C;yo.set(-1,0,0,0,1,0,0,0,1);function bo(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,E(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(vo.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(yo),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function xo(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return Se(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?ir(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):ir(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var So=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Co=null;function wo(){return Co===null&&(Co=new O(So,16,16,ke,Ne),Co.name=`DFG_LUT`,Co.minFilter=mn,Co.magFilter=mn,Co.wrapS=Ve,Co.wrapT=Ve,Co.generateMipmaps=!1,Co.needsUpdate=!0),Co}var To=class{constructor(e={}){let{canvas:t=Xt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:u=`default`,failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Bt}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=p,g=new Set([Gt,D,l]),b=new Set([Bt,er,Re,pt,bt,Xn]),x=new Uint32Array(4),C=new Int32Array(4),w=new J,T=null,E=null,O=[],k=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,ee=null,te=null,ne=null;this._outputColorSpace=ce;let re=0,ie=0,F=null,ae=-1,oe=null,se=new Be,le=new Be,ue=null,I=new S(0),de=0,fe=t.width,L=t.height,pe=1,me=null,he=null,ge=new Be(0,0,fe,L),_e=new Be(0,0,fe,L),ve=!1,ye=new ot,be=!1,xe=!1,Ce=new y,we=new J,Te=new Be,R={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},De=!1;function Oe(){return F===null?pe:1}let z=n;function ke(e,n){return t.getContext(e,n)}let Ae,je,B,Me,V,H,Fe,Ie,Le,ze,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,tt,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,rt,!1),z===null){let t=`webgl2`;if(z=ke(t,e),z===null)throw ke(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}et()}catch(e){throw t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),Se(`WebGLRenderer: `+e.message),e}function et(){Ae=new Hr(z),Ae.init(),Ze=new po(z,Ae),je=new _r(z,Ae,e,Ze),B=new uo(z,Ae),je.reversedDepthBuffer&&f&&B.buffers.depth.setReversed(!0),ee=z.createFramebuffer(),te=z.createFramebuffer(),ne=z.createFramebuffer(),Me=new Gr(z),V=new Wa,H=new fo(z,Ae,B,V,je,Ze,Me),Fe=new Vr(j),Ie=new lr(z),Qe=new hr(z,Ie),Le=new Ur(z,Ie,Me,Qe),ze=new qr(z,Le,Ie,Qe,Me),Je=new Kr(z,je,H),Ge=new vr(V),Ve=new Ua(j,Fe,Ae,je,Qe,Ge),He=new bo(j,V),Ue=new Ja,We=new to(Ae),qe=new mr(j,Fe,B,ze,m,s),Ke=new lo(j,ze,je),$e=new xo(z,Me,je,B),Ye=new gr(z,Ae,Me),Xe=new Wr(z,Ae,Me),Me.programs=Ve.programs,j.capabilities=je,j.extensions=Ae,j.properties=V,j.renderLists=Ue,j.shadowMap=Ke,j.state=B,j.info=Me}h!==1009&&(A=new Yr(h,t.width,t.height,o,r,i));let U=new _o(j,z);this.xr=U,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=Ae.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ae.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(e){e!==void 0&&(pe=e,this.setSize(fe,L,!1))},this.getSize=function(e){return e.set(fe,L)},this.setSize=function(e,n,r=!0){if(U.isPresenting){ir(`WebGLRenderer: Can't change size while VR device is presenting.`);return}fe=e,L=n,t.width=Math.floor(e*pe),t.height=Math.floor(n*pe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(fe*pe,L*pe).floor()},this.setDrawingBufferSize=function(e,n,r){fe=e,L=n,pe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(h===1009){Se(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){ir(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(se)},this.getViewport=function(e){return e.copy(ge)},this.setViewport=function(e,t,n,r){e.isVector4?ge.set(e.x,e.y,e.z,e.w):ge.set(e,t,n,r),B.viewport(se.copy(ge).multiplyScalar(pe).round())},this.getScissor=function(e){return e.copy(_e)},this.setScissor=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),B.scissor(le.copy(_e).multiplyScalar(pe).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(e){B.setScissorTest(ve=e)},this.setOpaqueSort=function(e){me=e},this.setTransparentSort=function(e){he=e},this.getClearColor=function(e){return e.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=g.has(t)}if(e){let e=F.texture.type,t=b.has(e),n=qe.getClearColor(),r=qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(x[0]=i,x[1]=a,x[2]=o,x[3]=r,z.clearBufferuiv(z.COLOR,0,x)):(C[0]=i,C[1]=a,C[2]=o,C[3]=r,z.clearBufferiv(z.COLOR,0,C))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),qe.dispose(),Ue.dispose(),We.dispose(),V.dispose(),Fe.dispose(),ze.dispose(),Qe.dispose(),$e.dispose(),Ve.dispose(),U.dispose(),U.removeEventListener(`sessionstart`,ut),U.removeEventListener(`sessionend`,dt),ft.stop()};function tt(e){e.preventDefault(),P(`WebGLRenderer: Context Lost.`),M=!0}function nt(){P(`WebGLRenderer: Context Restored.`),M=!1;let e=Me.autoReset,t=Ke.enabled,n=Ke.autoUpdate,r=Ke.needsUpdate,i=Ke.type;et(),Me.autoReset=e,Ke.enabled=t,Ke.autoUpdate=n,Ke.needsUpdate=r,Ke.type=i}function rt(e){Se(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function it(e){let t=e.target;t.removeEventListener(`dispose`,it),at(t)}function at(e){st(e),V.remove(e)}function st(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Ve.releaseProgram(e)}),e.isShaderMaterial&&Ve.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=R);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=wt(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Le.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Qe.setup(i,r,s,n,c);let h,g=Ye;if(c!==null&&(h=Ie.get(c),g=Xe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*Oe()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*Oe()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(Ae.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ie.get(c).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function W(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),be===!0&&Ge.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,yt(e,t,r),e.side=0,e.needsUpdate=!0,yt(e,t,r),e.side=2):yt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),E=We.get(n),E.init(t),k.push(E),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),xe=this.localClippingEnabled,be=Ge.init(this.clippingPlanes,xe),be===!0&&Ge.setGlobalState(this.clippingPlanes,t),N!==null&&Ke.render(E.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];W(o,n,t,e),r.add(o)}else W(i,n,t,e),r.add(i)}}),E=k.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=V.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ae.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function lt(e){ct&&ct(e)}function ut(){ft.stop()}function dt(){ft.start()}let ft=new cr;ft.setAnimationLoop(lt),typeof self<`u`&&ft.setContext(self),this.setAnimationLoop=function(e){ct=e,U.setAnimationLoop(e),e===null?ft.stop():ft.start()},U.addEventListener(`sessionstart`,ut),U.addEventListener(`sessionend`,dt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Se(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=U.enabled===!0&&U.isPresenting===!0,r=A!==null&&(F===null||n)&&A.begin(j,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(U.cameraAutoUpdate===!0&&U.updateCamera(t),t=U.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,F),E=We.get(e,k.length),E.init(t),E.state.textureUnits=H.getTextureUnits(),k.push(E),Ce.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ye.setFromProjectionMatrix(Ce,_,t.reversedDepth),xe=this.localClippingEnabled,be=Ge.init(this.clippingPlanes,xe),T=Ue.get(e,O.length),T.init(),O.push(T),U.enabled===!0&&U.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&mt(e,t,-1/0,j.sortObjects)}mt(e,t,0,j.sortObjects),T.finish(),N!==null&&N.updateLights(E.state.lightsArray),j.sortObjects===!0&&T.sort(me,he),De=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,De&&qe.addToRenderList(T,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),be===!0&&Ge.beginShadows();let i=E.state.shadowsArray;if(Ke.render(i,e,t),be===!0&&Ge.endShadows(),(r&&A.hasRenderPass())===!1){let n=T.opaque,r=T.transmissive;if(E.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];gt(n,r,e,a)}De&&qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ht(T,e,n,n.viewport)}}else r.length>0&&gt(n,r,e,t),De&&qe.render(e),ht(T,e,t)}F!==null&&ie===0&&(H.updateMultisampleRenderTarget(F),H.updateRenderTargetMipmap(F)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),Qe.resetDefaultState(),ae=-1,oe=null,k.pop(),k.length>0?(E=k[k.length-1],H.setTextureUnits(E.state.textureUnits),be===!0&&Ge.setGlobalState(j.clippingPlanes,E.state.camera)):E=null,O.pop(),T=O.length>0?O[O.length-1]:null,N!==null&&N.renderEnd()};function mt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)E.pushLightProbeGrid(e);else if(e.isLight)E.pushLight(e),e.castShadow&&E.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ye)){r&&Te.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ce);let i=ze.update(e),a=e.material;a.visible&&T.push(e,i,a,n,Te.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ye))){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Te.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Te.copy(e.boundingSphere.center)),Te.applyMatrix4(e.matrixWorld).applyMatrix4(Ce)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&T.push(e,i,c,n,Te.z,s,t)}}else a.visible&&T.push(e,i,a,n,Te.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)mt(i[e],t,n,r)}function ht(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;E.setupLightsView(n),be===!0&&Ge.setGlobalState(j.clippingPlanes,n),r&&B.viewport(se.copy(r)),i.length>0&&_t(i,t,n),a.length>0&&_t(a,t,n),o.length>0&&_t(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function gt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[r.id]===void 0){let e=Ae.has(`EXT_color_buffer_half_float`)||Ae.has(`EXT_color_buffer_float`);E.state.transmissionRenderTarget[r.id]=new Ee(1,1,{generateMipmaps:!0,type:e?Ne:Bt,minFilter:Ht,samples:Math.max(4,je.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:v.workingColorSpace})}let a=E.state.transmissionRenderTarget[r.id],o=r.viewport||se;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(I),de=j.getClearAlpha(),de<1&&j.setClearColor(16777215,.5),j.clear(),De&&qe.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),E.setupLightsView(r),be===!0&&Ge.setGlobalState(j.clippingPlanes,r),_t(e,n,r),H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a),Ae.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,vt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(I,de),d!==void 0&&(r.viewport=d),j.toneMapping=u}function _t(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&vt(o,t,n,s,l,c)}}function vt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function yt(e,t,n){t.isScene!==!0&&(t=R);let r=V.get(e),i=E.state.lights,a=E.state.shadowsArray,o=i.state.version,s=Ve.getParameters(e,i.state,a,t,n,E.state.lightProbeGridArray),c=Ve.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Fe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,it),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return St(e,s),d}else s.uniforms=Ve.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=Ve.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ge.uniform),St(e,s),r.needsLights=Et(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=E.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function xt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=na.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function St(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ct(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];w.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(w))return n}return null}function wt(e,t,n,r,i){t.isScene!==!0&&(t=R),H.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?j.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:v.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Fe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,y=V.get(r),b=E.state.lights;if(be===!0&&(xe===!0||e!==oe)){let t=e===oe&&r.id===ae;Ge.setState(r,e,t)}let x=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version?x=!0:y.outputColorSpace===s?i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isBatchedMesh&&y.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&y.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&y.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&y.instancingMorph===!1&&i.morphTexture!==null?x=!0:y.envMap===l?r.fog===!0&&y.fog!==a||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==Ge.numPlanes||y.numIntersection!==Ge.numIntersection)?x=!0:y.vertexAlphas===u&&y.vertexTangents===d&&y.morphTargets===f&&y.morphNormals===p&&y.morphColors===m&&y.toneMapping===h&&y.morphTargetsCount===_?!!y.lightProbeGrid!=E.state.lightProbeGridArray.length>0&&(x=!0):x=!0:x=!0:x=!0:(x=!0,y.__version=r.version);let S=y.currentProgram;x===!0&&(S=yt(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,S,y));let C=!1,w=!1,T=!1,D=S.getUniforms(),O=y.uniforms;if(B.useProgram(S.program)&&(C=!0,w=!0,T=!0),r.id!==ae&&(ae=r.id,w=!0),y.needsLights){let e=Ct(E.state.lightProbeGridArray,i);y.lightProbeGrid!==e&&(y.lightProbeGrid=e,w=!0)}if(C||oe!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(z,`projectionMatrix`,e.projectionMatrix),D.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(z,we.setFromMatrixPosition(e.matrixWorld)),je.logarithmicDepthBuffer&&D.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),oe!==e&&(oe=e,w=!0,T=!0)}if(y.needsLights&&(b.state.sunShadowMap.length>0&&D.setValue(z,`sunShadowMap`,b.state.sunShadowMap,H),b.state.directionalShadowMap.length>0&&D.setValue(z,`directionalShadowMap`,b.state.directionalShadowMap,H),b.state.spotShadowMap.length>0&&D.setValue(z,`spotShadowMap`,b.state.spotShadowMap,H),b.state.pointShadowMap.length>0&&D.setValue(z,`pointShadowMap`,b.state.pointShadowMap,H)),i.isSkinnedMesh){D.setOptional(z,i,`bindMatrix`),D.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(z,`boneTexture`,e.boneTexture,H))}i.isBatchedMesh&&(D.setOptional(z,i,`batchingTexture`),D.setValue(z,`batchingTexture`,i._matricesTexture,H),D.setOptional(z,i,`batchingIdTexture`),D.setValue(z,`batchingIdTexture`,i._indirectTexture,H),D.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(z,`batchingColorTexture`,i._colorsTexture,H));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&Je.update(i,n,S),(w||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,D.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=wo()),w){if(D.setValue(z,`toneMappingExposure`,j.toneMappingExposure),y.needsLights&&Tt(O,T),a&&r.fog===!0&&He.refreshFogUniforms(O,a),He.refreshMaterialUniforms(O,r,pe,L,E.state.transmissionRenderTarget[e.id]),y.needsLights&&y.lightProbeGrid){let e=y.lightProbeGrid;O.probesSH.value=e.texture,O.probesMin.value.copy(e.boundingBox.min),O.probesMax.value.copy(e.boundingBox.max),O.probesResolution.value.copy(e.resolution)}na.upload(z,xt(y),O,H)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(na.upload(z,xt(y),O,H),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(z,`center`,i.center),D.setValue(z,`modelViewMatrix`,i.modelViewMatrix),D.setValue(z,`normalMatrix`,i.normalMatrix),D.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];$e.update(n,S),$e.bind(n,S)}}return S}function Tt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Et(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return ie},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,re=t,ie=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),se.copy(e.viewport),le.copy(e.scissor),ue=e.scissorTest,B.viewport(se),B.scissor(le),B.setScissorTest(ue),ae=-1;return}if(o.__webglFramebuffer===void 0)H.setupRenderTarget(e);else if(o.__hasExternalTextures)H.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);H.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&H.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,se.copy(e.viewport),le.copy(e.scissor),ue=e.scissorTest}else se.copy(ge).multiplyScalar(pe).floor(),le.copy(_e).multiplyScalar(pe).floor(),ue=ve;if(n!==0&&(r=ee),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(se),B.scissor(le),B.setScissorTest(ue),i){let r=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}ae=-1};function G(e){let t=V.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=je.textureFormatReadable(e.format),t.__typeReadable=je.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Se(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){B.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=G(o);if(u.__formatReadable===!1){Se(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Se(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,Ze.convert(c),Ze.convert(l),a)}finally{let e=F===null?null:V.get(F).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=G(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,Ze.convert(l),Ze.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=F===null?null:V.get(F).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Pe(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;H.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ze.convert(t.format),_=Ze.convert(t.type),v;t.isData3DTexture?(H.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(H.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(H.setTexture2D(t,0),v=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(z.UNPACK_ROW_LENGTH),b=B.getParameter(z.UNPACK_IMAGE_HEIGHT),x=B.getParameter(z.UNPACK_SKIP_PIXELS),S=B.getParameter(z.UNPACK_SKIP_ROWS),C=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,l),B.pixelStorei(z.UNPACK_SKIP_ROWS,u),B.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),h=V.get(n.__renderTarget),g=V.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,o,s,f,p,o,s,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,te),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,ne);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,o,s,f,p,o,s,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(z.UNPACK_ROW_LENGTH,y),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(z.UNPACK_SKIP_PIXELS,x),B.pixelStorei(z.UNPACK_SKIP_ROWS,S),B.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&z.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&H.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?H.setTextureCube(e,0):e.isData3DTexture?H.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?H.setTexture2DArray(e,0):H.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){re=0,ie=0,F=null,B.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return _}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=v._getDrawingBufferColorSpace(e),t.unpackColorSpace=v._getUnpackColorSpace()}},Eo={raynor:{hero:`raynor`,roster:`terran`,powers:[`rally`,`banshee`,`drop`,`hyperion`],army:[`raynor`,`marine`,`firebat`,`tank`,`thor`,`immortal`,`colossus`,`templar`]},artanis:{hero:`artanis`,roster:`protoss`,powers:[`orbital`,`lance`,`bombardment`],passives:[`guardianShell`],force:`DAELAAM GOLDEN ARMADA`,army:[`artanis`,`dragoon`,`zealot`,`reaver`,`carrier`,`tempest`,`darktemplar`,`phoenix`,`immortal`,`colossus`,`templar`]},swann:{opening:`hellion`,roster:`mech`,powers:[`combatdrop`,`spidermines`,`beam`],passives:[`laserdrill`,`immortality`],army:[`hellion`,`hellbat`,`tank`,`thor`,`goliath`,`cyclone`,`sciencevessel`]}},Do={army:[`marine`,`firebat`,`tank`,`thor`,`immortal`,`colossus`,`templar`],powers:[]},Oo={guardianShell:`powers/guardian-shell`,laserdrill:`powers/laserdrill`,immortality:`powers/immortality`},ko={start:2.5,end:9.5,stretch:12/7},Ao=(ko.end-ko.start)*(ko.stretch-1),jo=e=>e<=ko.start?e:e<=ko.end?ko.start+(e-ko.start)*ko.stretch:e+Ao,Mo=e=>e<=ko.start?e:e<=jo(ko.end)?ko.start+(e-ko.start)/ko.stretch:e-Ao,No=jo(90),Po=jo(78.5),Fo=[2.5,6,9.5,15,22,30,38,47,56,66].map(jo),Io=[3,6,9],Lo=e=>e>ko.start&&e<jo(ko.end),Ro=(e,t)=>Object.defineProperty({start:t},"name",{enumerable:!0,get:()=>I(`phase.${e}`)}),zo=[Ro(0,0),Ro(1,30),Ro(2,60),Ro(3,75)].map(e=>Object.defineProperty(e,"start",{value:jo(e.start),enumerable:!0})),Bo={rateScale:1,waveScale:4,overScale:1},Vo=[{start:0,rate:3},{start:12,rate:5},{start:30,rate:9},{start:60,rate:13},{start:75,rate:9}].map(e=>({...e,start:jo(e.start)})),Ho={lead:2.6,hushRate:1},Uo=[{at:4,count:6,over:.6},{at:7.5,count:10,over:.8},{at:11,count:16,over:1},{at:14.5,count:24,over:1},{at:18,count:34,over:1.2},{at:21.5,count:46,over:1.2},{at:25,count:60,over:1.4},{at:28.5,count:80,over:1.5},{herald:`baneling`,at:34.5,count:60,over:.9,lane:0,spread:6.4,banelings:80},{at:40.5,count:200,over:2,hydralisks:4,roaches:6},{herald:`roach`,at:46.5,count:250,over:1,lane:0,spread:6.4,hydralisks:4,banelings:16,roaches:12},{at:52.5,count:300,over:2.2,hydralisks:4,banelings:10,roaches:8,aberrations:2},{herald:`assault`,at:58.5,count:340,over:1.2,lane:0,spread:6.4,banelings:44,roaches:15,aberrations:3},{at:65.5,count:400,over:2.6,hydralisks:6,banelings:14,roaches:12,aberrations:3},{at:72.5,count:400,over:3,hydralisks:6,banelings:18,roaches:14,aberrations:2},{herald:`breakthrough`,at:78.5,count:480,over:1.4,lane:0,spread:6.4,hydralisks:6,banelings:56,roaches:20},{herald:`final`,at:83,count:500,over:1.5,lane:0,spread:6.4,banelings:60,roaches:22},{at:87,count:520,over:3,hydralisks:6,banelings:20,roaches:15}].map(e=>({...e,at:jo(e.at)})),Wo={centers:[-2.2,0,2.2],halfWidth:5.4,trickleHalfWidth:5.6,teach:[0,-2.4,2.4,0,2.4,-2.4,0,-2.4]},Go={first:jo(31),every:8,count:120,edge:5.4,chase:!0,chaseFrom:1};function Ko(e){let t=Vo[0].rate;for(let n of Vo)e>=n.start&&(t=n.rate);return t*Bo.rateScale*(Lo(e)?1/ko.stretch:1)}function qo(e,t=null){let n=0;for(;n+1<zo.length&&e>=zo[n+1].start;)n++;return{...zo[n],index:n,surge:!!t,wave:t,rate:Ko(e)}}var Jo=(e,t)=>e*65536+t,Yo=class{constructor(e=3){this.size=e,this.cells=new Map,this.used=[],this.count=0}rebuild(e){for(let e of this.used)e.length=0;this.used.length=0,this.count=e.length;for(let t=0;t<e.length;t++){let n=e[t];if(n.dead)continue;n.gridIndex=t;let r=Jo(Math.floor(n.x/this.size),Math.floor(n.z/this.size)),i=this.cells.get(r);i||this.cells.set(r,i=[]),i.length||this.used.push(i),i.push(n)}}queryRect(e,t,n,r,i){i.length=0;let a=this.size;for(let o=Math.floor(n/a);o<=Math.floor(r/a);o++)for(let n=Math.floor(e/a);n<=Math.floor(t/a);n++){let e=this.cells.get(Jo(n,o));if(e)for(let t of e)t.dead||i.push(t)}return i}query(e,t,n){return this.queryRect(e-n,e+n,t-n,t+n,[])}},Xo=(e,t,n)=>Math.max(t,Math.min(n,e)),Zo=q.colossus,Qo=e=>(e.attributes??Le[e.kind]??[]).includes(`light`);function $o(e,t,r,i){e.damageEnemy(t,r,!1,i);let a=e.modules.overcharge??0;a&&!t.dead&&Qo(t)&&(t.thermalSlow=a*n.overchargeSlow,t.thermalSlowUntil=e.time+n.overchargeSlowDuration)}var es=.45;function ts(e,t){return!t.dead&&t.z<=17.2&&Math.hypot(t.x-e.x,t.z-e.z)<=Zo.range}var ns=Zo.beamSeparation/2+Zo.beamRadius;function rs(e,t){let n=[],r=null;for(let i of e.enemies)ts(t,i)&&(n.push(i),i.clawing&&(!r||i.z>r.z)&&(r=i));if(r)return r;if(!n.length)return null;let i=Hn(`colossus`,e.modules).sweepWidth,a=Math.min(24,n.length),o=null,s=-1/0;for(let r=0;r<a;r++){let c=n[Math.floor(r*n.length/a)],l=Xo(c.x,-6.7+i/2,6.7-i/2),u=0;for(let n of e.nearbyEnemies(l,c.z,i))ts(t,n)&&Math.abs(n.z-c.z)<=ns&&Math.abs(n.x-l)<=i/2&&(u+=Qo(n)?2:1);let d=e.scorchTrails.some(e=>Math.abs(e.z-c.z)<ns),f=e.supports.some(e=>e!==t&&e.sweep&&Math.abs(e.sweep.z-c.z)<ns*2),p=u*(d?.4:1)*(f?.2:1)-c.z*.1;p>s&&(o=c,s=p)}return o}function is(e,t){let n=rs(e,t);if(n??=e.boss&&ts(t,e.boss)?e.boss:null,!n)return!1;let r=Hn(`colossus`,{weapon:e.weaponLevel-1,...e.modules},e.researchLevel,e.overdrive>0,e.buffScale,e.rateScale),i=r.sweepWidth,a=Xo(n.x,-6.7+i/2,6.7-i/2);if(t.volley=(t.volley??0)+1,t.cooldown=r.cooldownMin,t.sweep={left:a-i/2,right:a+i/2,z:n.z,elapsed:0,duration:Zo.sweepDuration/r.rate,first:Zo.sweepDuration/r.rate,previousX:a-i/2,hit:new Set,bossHit:!1,stats:r,center:a,slope:(t.volley%2?1:-1)*es/(i/2),passes:(e.modules.resweep??0)*sr.resweep.passesPerLevel,reverse:!1},e.heroic.has(`colossus`)){let n=i*A.reach,r=t.sweep;r.beams=[{from:r.left,to:r.left+n},{from:r.right,to:r.right-n}].map(e=>({...e,previousX:e.from,hit:new Set,bossHit:!1})),e.equipmentTriggers.crossburn++}return t.attackAnimation=t.attackDuration=t.sweep.duration,t.yaw=0,e.shotsFired++,e.events.push({type:`thermalStart`,x:t.x,z:t.z}),!0}function as(e,t,n,r,i,a){let o=Zo.beamSeparation/2+Zo.beamRadius;n.beams.forEach((s,c)=>{let l=n.reverse?s.to+(s.from-s.to)*r:s.from+(s.to-s.from)*r,u=Math.min(s.previousX,l),d=Math.max(s.previousX,l),f=n.beams[1-c],p=e=>{if(!ts(t,e))return!1;let r=e.x-Xo(e.x,u,d),i=Math.max(0,Math.abs(e.z-n.z)-Zo.beamSeparation/2);return Math.hypot(r,i)<=Zo.beamRadius};for(let t of e.nearbyEnemies((u+d)/2,n.z,(d-u)/2+o))!s.hit.has(t.id)&&p(t)&&(s.hit.add(t.id),$o(e,t,yn(n.stats,t)*a*(f.hit.has(t.id)?A.overlapDamage:1),i));e.boss&&!s.bossHit&&p(e.boss)&&(s.bossHit=!0,e.damageBoss(n.stats.bossDamage*a*(f.bossHit?A.overlapDamage:1),i)),e.events.push({type:`thermalBeam`,unit:t,tx:l,tz:n.z+(l-n.center)*n.slope,separation:Zo.beamSeparation,reverse:n.reverse,beam:c}),cs(e,t,n,l),s.previousX=l}),n.previousX=n.beams[0].previousX}function os(e,t,n){if(t.hp<=0){t.sweep?.trail&&(t.sweep.trail.live=!1),t.sweep=null;return}if(t.cooldown-=n,!t.sweep&&(t.cooldown>0||!is(e,t)))return;let r=t.sweep;r.elapsed=Math.min(r.duration,r.elapsed+n);let i=r.elapsed/r.duration;if(r.beams){as(e,t,r,i,K(t,r.extra?`resweep`:`thermal`,0),r.extra?e.synergyScale(`thermal-crossfire`):1),i>=1&&ss(e,t,r);return}let a=r.reverse?r.right-(r.right-r.left)*i:r.left+(r.right-r.left)*i,o=Math.min(r.previousX,a),s=Math.max(r.previousX,a),c=K(t,r.extra?`resweep`:`thermal`,0),l=r.extra?e.synergyScale(`thermal-crossfire`):1,u=e=>{if(!ts(t,e))return!1;let n=e.x-Xo(e.x,o,s);return[-1,1].some(t=>Math.hypot(n,e.z-r.z-t*Zo.beamSeparation/2)<=Zo.beamRadius)},d=(s-o)/2+Zo.beamRadius+Zo.beamSeparation/2;for(let t of e.nearbyEnemies((o+s)/2,r.z,d))!r.hit.has(t.id)&&u(t)&&(r.hit.add(t.id),$o(e,t,yn(r.stats,t)*l,c));e.boss&&!r.bossHit&&u(e.boss)&&(r.bossHit=!0,e.damageBoss(r.stats.bossDamage*l,c)),e.events.push({type:`thermalBeam`,unit:t,tx:a,tz:r.z+(a-r.center)*r.slope,separation:Zo.beamSeparation,reverse:r.reverse}),cs(e,t,r,a),r.previousX=a,!(i<1)&&ss(e,t,r)}function ss(e,t,n){if(n.passes>0){n.extra&&(n.duration=n.first/sr.resweep.passSpeed),n.passes--,n.extra=!0,n.reverse=!n.reverse,n.elapsed=0,n.hit.clear(),n.bossHit=!1;for(let e of n.beams??[])e.hit.clear(),e.bossHit=!1;t.attackAnimation=t.attackDuration=t.sweep.duration,e.equipmentTriggers.resweep++,e.shotsFired++,e.events.push({type:`thermalStart`,x:t.x,z:t.z,equipment:`resweep`})}else n.trail&&(n.trail.live=!1),t.sweep=null}function cs(e,t,n,r){let i=e.modules.firebeam??0;if(!i)return;let a=Zo.scorch,o=a.duration+a.perLevel*(i-1),s=n.trail;(!s||!e.scorchTrails.includes(s))&&(s=n.trail={id:e.nextTrailId=(e.nextTrailId??0)+1,from:n.previousX,to:r,z:n.z,separation:Zo.beamSeparation,remaining:o,duration:o,age:0,scale:n.stats.scale,source:K(t,`scorch`,0)},e.scorchTrails.push(s),e.scorchTrails.length>a.maxTrails&&e.scorchTrails.shift()),s.from=Math.min(s.from,r),s.to=Math.max(s.to,r),s.remaining=o,s.live=!0}function ls(e,t,n){let r=Zo.scorch;if(e.scorchTrails=e.scorchTrails.filter(e=>(e.live||(e.z+=n*t),e.age+=t,(e.remaining-=t)>0)),!e.scorchTrails.length||(e.scorchTick=(e.scorchTick??0)-t)>0)return;e.scorchTick+=r.tick;let i=(e,t,n=0)=>t.x>=e.from-n&&t.x<=e.to+n&&[-1,1].some(i=>Math.abs(t.z-e.z-i*e.separation/2)<=r.halfDepth+n);for(let t of e.scorchTrails){let n=(t.to-t.from)/2;for(let a of e.nearbyEnemies(t.from+n,t.z,n+t.separation+r.halfDepth))!a.dead&&a.scorchTick!==e.time&&i(t,a)&&(a.scorchTick=e.time,e.damageEnemy(a,r.damage*t.scale*Kt(`colossus`,a),!1,t.source));let a=e.boss;a&&!a.dead&&a.scorchTick!==e.time&&i(t,a,1.5)&&(a.scorchTick=e.time,e.damageBoss(r.bossDamage*t.scale,t.source))}}var us=(e,t)=>e.modules[t]??0,ds=.35,fs=e=>e in ue;function ps(e,t){return(ue[t.kind]??0)+(t.kind===`dragoon`?W.trillicShield*us(e,`trillic`):0)}function ms(e,t){return fs(t.kind)?(t.shieldMax=t.shield=ps(e,t),t.protossShield=!0,t):t}function hs(e,t){for(let n of[e.marines,e.tanks,e.supports])for(let r of n){if(!r.protossShield||r.hp<=0)continue;r.shieldMax=ps(e,r);let n=ue.delay*(r.kind===`dragoon`?Math.max(.2,1-W.trillicDelay*us(e,`trillic`)):1);e.time-(r.lastHitAt??-1/0)>=n&&(r.shield=Math.min(r.shieldMax,(r.shield??0)+ue.regen*t))}}function gs(e,t,n){return!Eo[e.commander]?.passives?.includes(`guardianShell`)||t.hp-n>0||(t.guardianReadyAt??-1/0)>e.time?!1:(t.guardianReadyAt=e.time+f.cooldown,t.invulnerableUntil=e.time+f.invulnerable,t.hp=Math.min(t.maxHp,Math.max(t.hp,0)+t.maxHp*f.heal),t.shieldMax&&(t.shield=Math.min(t.shieldMax,(t.shield??0)+t.shieldMax*f.heal)),e.guardianShells=(e.guardianShells??0)+1,e.events.push({type:`guardianShell`,x:t.x,z:t.z,id:t.id,duration:f.invulnerable}),!0)}function _s(e){return q.dragoon.range+W.singularityRange*us(e,`singularity`)}function vs(e,t){return q[t.kind].charge.range+(t.kind===`zealot`?W.chargeRange*us(e,`charge`):0)}function ys(e,t,n,r,i){let a=q.dragoon,o=1+W.singularityDamage*us(e,`singularity`);t.cooldown=(a.cooldown+e.random()*a.jitter)/i/(1+W.phaseReactor*us(e,`phasereactor`)),t.attackAnimation=t.attackDuration;let s=n.target,c=K(t,`plasma`);if(e.events.push({type:`plasma`,x:t.x,z:t.z,tx:s.x,tz:s.z,id:t.id}),n.pod){e.damagePod(a.damage*r*o);return}if(n.boss){e.damageBoss(a.bossDamage*r*o,c);return}let l=(s.attributes??[]).includes(`armored`)?W.ionBarrel*us(e,`ionbarrel`):0;e.damageEnemy(s,a.damage*r*o*(Kt(`dragoon`,s)+l),!0,c);let u=us(e,`antiphase`)>0,{radius:d,share:f,maxTargets:p}=u?W.antiphase:a.splash;for(let t of e.splashTargets(s.x,s.z,d,p))t!==s&&e.damageEnemy(t,a.damage*r*o*f,!0,c);u&&(e.equipmentTriggers.antiphase=(e.equipmentTriggers.antiphase??0)+1)}function bs(e,t,n,r,i){let a=q[t.kind],o=n.target,s=Math.hypot(o.x-t.x,o.z-t.z),c=t.kind===`zealot`,l=K(t,`blade`,0);if(s>a.reach+(n.boss?2.5:0)){if((t.chargeReadyAt??-1/0)>e.time||s>vs(e,t)){t.cooldown=.1;return}let l=c&&e.heroic.has(`zealot`),u=a.charge.cooldown*(c?Math.max(.3,1-W.chargeCooldown*us(e,`charge`)):1)*(l?W.legionCharge.cooldown:1);t.chargeReadyAt=e.time+u,t.cooldown=a.cooldown/i,t.attackAnimation=t.attackDuration,t.lunge={x:o.x-t.x,z:o.z-t.z,t:ds},e.events.push({type:`charge`,x:t.x,z:t.z,tx:o.x,tz:o.z,id:t.id,kind:t.kind});let d=K(t,`charge`,0);if(n.pod?e.damagePod(a.charge.damage*r):n.boss?e.damageBoss(a.charge.bossDamage*r,d):e.damageEnemy(o,a.charge.damage*r,!0,d),l){let{halfWidth:n,share:i}=W.legionCharge,s=o.x-t.x,c=o.z-t.z,l=s*s+c*c||1e-6;for(let u of e.nearbyEnemies((t.x+o.x)/2,(t.z+o.z)/2,Math.sqrt(l)/2+1)){if(u.dead||u===o)continue;let f=Math.max(0,Math.min(1,((u.x-t.x)*s+(u.z-t.z)*c)/l));Math.hypot(u.x-t.x-s*f,u.z-t.z-c*f)<n&&e.damageEnemy(u,a.charge.damage*r*i,!0,d)}}c&&!n.pod&&!n.boss&&e.formedSynergies.has(`blade-scarab`)&&ws(e,o,r),c&&!n.pod&&!n.boss&&e.formedSynergies.has(`psionic-charge`)&&Ts(e,o);let f=c?us(e,`impact`)?W.impact:null:{radius:a.charge.radius,share:1,maxTargets:12};if(f){for(let t of e.splashTargets(o.x,o.z,f.radius,f.maxTargets))t!==o&&e.damageEnemy(t,a.charge.damage*r*f.share,!0,d);c&&(e.equipmentTriggers.impact=(e.equipmentTriggers.impact??0)+1)}return}if(t.cooldown=a.cooldown/i,t.attackAnimation=t.attackDuration,e.events.push({type:`blade`,x:t.x,z:t.z,tx:o.x,tz:o.z,id:t.id,kind:t.kind}),n.pod){e.damagePod(a.damage*r);return}if(n.boss){e.damageBoss(a.bossDamage*r,l);return}if(e.damageEnemy(o,a.damage*r,!0,l),a.cleave)for(let t of e.splashTargets(o.x,o.z,a.cleave,8))t!==o&&e.damageEnemy(t,a.damage*r*.6,!0,l)}function xs(e,t,n,r,i){let a=q.archon,o=n.target,s=K(t,`psionic`,0);t.cooldown=a.cooldown/i,t.attackAnimation=t.attackDuration;let c=[[t.x,t.z],[o.x,o.z]];if(n.pod)e.damagePod(a.damage*r);else if(n.boss)e.damageBoss(a.bossDamage*r,s);else for(let t of e.splashTargets(o.x,o.z,a.radius,a.maxTargets)){let n=(t.attributes??[]).includes(`biological`)?1+a.bio:1;e.damageEnemy(t,a.damage*r*n,!0,s),t!==o&&c.length<5&&c.push([t.x,t.z])}e.events.push({type:`lightningBolt`,points:c,x:t.x,z:t.z,archon:!0})}function Ss(e){let t=e.supports.filter(e=>e.kind===`templar`&&!e.merc&&e.hp>0).slice(0,2);if(t.length<2)throw Error(`Archon merge needs two High Templar`);e.supports=e.supports.filter(e=>!t.includes(e));let n=(t[0].x+t[1].x)/2,r=(t[0].z+t[1].z)/2;e.addArchon(n,r),e.events.push({type:`archonMerge`,x:n,z:r,from:t.map(e=>({x:e.x,z:e.z}))})}function Cs(e,t,n,r){let i=q.reaver,a=e.enemies.filter(e=>!e.dead&&e.z>i.targetMinZ&&e.z<i.targetMaxZ&&t.z-e.z>i.deadZone),o=e.scarabs.filter(e=>e.share===void 0&&e.remaining>0),s=e=>o.some(t=>Math.hypot(t.tx-e.x,t.tz-e.z)<t.radius*1.2)?i.spread:0,c=t=>-Math.abs(t.z-i.focusZ)-Math.abs(t.x-e.x)*.65+(t.kind===`baneling`?.75:0)-s(t),l=a.reduce((e,t)=>!e||c(t)>c(e)?t:e,null);if(e.boss&&!e.boss.dead&&e.boss.z>-12&&(l=e.boss),!l){t.cooldown=.08;return}t.yaw=Math.atan2(t.x-l.x,t.z-l.z),t.recoil=1,t.attackAnimation=t.attackDuration=.4,t.cooldown=i.cooldown/(r>1?1.4:1)/e.rateScale/(1+W.scarabRate*us(e,`scarabbay`))/(t.rateMult??1);let u=i.radius+W.solarite*us(e,`solarite`),d={target:l,x:t.x,z:t.z-1.2,tx:l.x,tz:l.z,remaining:i.flight,radius:u,damage:i.damage*n,bossDamage:i.bossDamage*n,maxTargets:i.maxTargets,source:K(t,`scarab`,0),chain:us(e,`chainscarab`)>0};if(e.scarabs.push(d),e.events.push({type:`scarab`,x:d.x,z:d.z,tx:l.x,tz:l.z,flight:i.flight,id:t.id}),!e.heroic.has(`reaver`)||l===e.boss)return;let f=a.filter(e=>e!==l).sort((e,t)=>c(t)-c(e)).slice(0,W.scarabStorm.extra);for(let n of f)e.scarabs.push({...d,target:n,tx:n.x,tz:n.z}),e.events.push({type:`scarab`,x:d.x,z:d.z,tx:n.x,tz:n.z,flight:i.flight,id:t.id})}function ws(e,t,n){let r=e.tanks.find(t=>t.kind===`reaver`&&t.hp>0&&e.time>=(t.jointReadyAt??0));if(!r)return;r.jointReadyAt=e.time+qe.bladeScarab.cooldown;let i=q.reaver,a=i.radius+W.solarite*us(e,`solarite`);e.scarabs.push({target:t,x:r.x,z:r.z-1.2,tx:t.x,tz:t.z,remaining:i.flight,radius:a,damage:i.damage*n,bossDamage:i.bossDamage*n,maxTargets:i.maxTargets,source:K(r,`scarab`,0),chain:us(e,`chainscarab`)>0}),e.events.push({type:`scarab`,x:r.x,z:r.z-1.2,tx:t.x,tz:t.z,flight:i.flight,id:r.id,joint:!0})}function Ts(e,t){let n=e.supports.find(t=>t.kind===`templar`&&t.hp>0&&e.time>=(t.jointReadyAt??0));if(!n)return;let r=qe.psionicCharge,i=q.templar;n.jointReadyAt=e.time+r.cooldown,e.storms.push({x:t.x,z:t.z,radius:r.radius,remaining:r.duration,tick:0,damage:i.damage,bossDamage:i.bossDamage,source:K(n,`storm`)}),e.events.push({type:`storm`,x:t.x,z:t.z,radius:r.radius,duration:r.duration,twin:!1,joint:!0})}function Es(e,t,n,r){let i=q.phoenix,a=t.lifting??=[];if(t.hp<=0){for(let e of a)e.target.lifted=Math.min(e.target.lifted??0,.2);a.length=0;return}let o=K(t,`graviton`,0),s=i.dps*r*(1+W.anionPulse*us(e,`anionpulse`));for(let i=a.length-1;i>=0;i--){let c=a[i].target;if(c.dead||!(c.lifted>0)){if(c.dead&&(t.nextLift=Math.min(t.nextLift??1/0,e.time+.3)),e.heroic.has(`phoenix`)){let n=W.gravitonSlam,i=K(t,`gravitonslam`,0);for(let t of e.splashTargets(c.x,c.z,n.radius,n.maxTargets))t!==c&&e.damageEnemy(t,n.damage*r,!0,i);e.events.push({type:`gravitonSlam`,x:c.x,z:c.z,radius:n.radius})}a.splice(i,1);continue}e.damageEnemy(c,s*n,!1,o)}if(a.length&&(t.shotTimer=(t.shotTimer??0)-n)<=0&&(t.shotTimer=.4,e.events.push({type:`phoenixShot`,id:t.id,x:t.x,z:t.z,tx:a[0].target.x,tz:a[0].target.z})),t.nextLift??=e.time+i.first,a.length>=i.holds||e.time<t.nextLift)return;let c=e=>!e.dead&&!(e.lifted>0)&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=i.range,l=null;for(let t of e.enemies)c(t)&&(!l||t.maxHp>l.maxHp||t.maxHp===l.maxHp&&t.z<l.z)&&(l=t);if(!l){t.nextLift=e.time+.3;return}t.nextLift=e.time+i.every;let u=i.duration+W.gravitonSurge*us(e,`gravitonsurge`),d=[l];if(us(e,`massgraviton`)){let{radius:t,count:n}=W.massGraviton;for(let r of e.splashTargets(l.x,l.z,t,n+1))r!==l&&!(r.lifted>0)&&d.length<=n&&d.push(r);d.length>1&&(e.equipmentTriggers.massgraviton=(e.equipmentTriggers.massgraviton??0)+1)}for(let e of d)e.lifted=u,a.push({target:e});e.events.push({type:`gravitonBeam`,id:t.id,x:t.x,z:t.z,tx:l.x,tz:l.z,count:d.length,duration:u})}function Ds(e,t,n,r){t.blink&&(t.blink.t-=n)<=0&&(t.blink=null);let i=q.darktemplar;if(t.echoes?.length&&(t.echoes=t.echoes.filter(n=>{if(e.time<n.at)return!0;e.events.push({type:`shadowStrike`,id:t.id,fromX:n.x,fromZ:n.z,x:n.x,z:n.z,radius:i.radius,second:!0,echo:!0});for(let t of e.splashTargets(n.x,n.z,i.radius,i.maxTargets))e.damageEnemy(t,n.damage,!0,n.source);return!1})),t.hp<=0||(t.nextBlink??=e.time+i.first,e.time<t.nextBlink))return;let a=e=>!e.dead&&e.z>i.minZ&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=i.reach,o=e.boss&&!e.boss.dead&&a(e.boss)?e.boss:null,s=o?[{x:o.x,z:o.z,boss:!0}]:Os(e,e.enemies.filter(a),i,us(e,`shadowfury`)?2:1);if(!s.length){t.nextBlink=e.time+.3;return}t.nextBlink=e.time+i.cooldown/(1+W.shadowStride*us(e,`shadowstride`));let c=i.damage*r*(1+W.voidBlade*us(e,`voidblade`)),l=K(t,`warpblade`,0);t.blink={x:s[0].x-t.x,z:s[0].z-t.z,t:i.stay},t.attackAnimation=t.attackDuration;for(let[n,a]of s.entries()){if(e.events.push({type:`shadowStrike`,id:t.id,fromX:n?s[n-1].x:t.x,fromZ:n?s[n-1].z:t.z,x:a.x,z:a.z,radius:i.radius,second:n>0}),a.boss){e.damageBoss(i.bossDamage*r*(1+W.voidBlade*us(e,`voidblade`)),l);continue}for(let t of e.splashTargets(a.x,a.z,i.radius,i.maxTargets))e.damageEnemy(t,c,!0,l);e.heroic.has(`darktemplar`)&&(t.echoes??=[]).push({x:a.x,z:a.z,at:e.time+W.shadowEcho.delay,damage:c*W.shadowEcho.share,source:K(t,`shadowecho`,0)})}s.length>1&&(e.equipmentTriggers.shadowfury=(e.equipmentTriggers.shadowfury??0)+1)}function Os(e,t,n,r){if(!t.length)return[];let i=n.radius,a=new Map,o=(e,t)=>e*4096+t;for(let e of t){let t=o(Math.floor(e.x/i),Math.floor(e.z/i));a.set(t,(a.get(t)??0)+1)}let s=e=>{let t=Math.floor(e.x/i),n=Math.floor(e.z/i),r=0;for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++)r+=a.get(o(t+e,n+i))??0;return r},c=[];for(let i=0;i<r;i++){let r=null,i=-1;for(let a=0;a<n.samples;a++){let a=t[Math.floor(e.random()*t.length)];if(c.some(e=>Math.hypot(e.x-a.x,e.z-a.z)<n.radius*1.2))continue;let o=s(a);o>i&&(r=a,i=o)}r&&c.push({x:r.x,z:r.z})}return c}function ks(e,t,n){e.events.push({type:`scarabBlast`,x:t.tx,z:t.tz,radius:t.radius,chain:n<1});for(let r of e.splashTargets(t.tx,t.tz,t.radius,t.maxTargets))e.damageEnemy(r,t.damage*n,!0,t.source);let r=e.boss;r&&!r.dead&&Math.hypot(r.x-t.tx,r.z-t.tz)<t.radius+2&&e.damageBoss(t.bossDamage*n,t.source)}function As(e){let t=q.tempest,n=us(e,`gravitysling`);return{radius:t.radius+W.gravitySling.radius*n,maxTargets:t.maxTargets+W.gravitySling.targets*n,duration:t.sunder.duration}}var js=e=>e.elite||(e.attributes??Le[e.kind]??[]).includes(`armored`);function Ms(e,t,n,r){let i=q.tempest,a=e.enemies.filter(e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=i.range);if(!a.length)return[];let o=a.filter(js),s=o.length?o:a,c=t=>{let r=0;for(let a of e.nearbyEnemies(t.x,t.z,n))!a.dead&&Math.hypot(a.x-t.x,a.z-t.z)<n&&(r+=js(a)?i.heavyWeight:1);return r*(1+Math.max(0,-t.z)*.03)},l=[];for(let t=0;t<r;t++){let t=null,r=-1;for(let a=0;a<i.samples;a++){let i=s[Math.floor(e.random()*s.length)];if(l.some(e=>Math.hypot(e.x-i.x,e.z-i.z)<n*1.5))continue;let a=c(i);a>r&&(t=i,r=a)}t&&l.push({x:t.x,z:t.z})}return l}function Ns(e,t,n,r){let i=q.tempest,a=t.disintegrating??=[];if(t.hp<=0){a.length=0;return}let o=1+W.disintegration*us(e,`disintegration`),s=e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=i.range?e.boss:null,c=K(t,`disintegration`,0);for(let s=a.length-1;s>=0;s--){if(a[s].target.dead||e.time>=a[s].until){a.splice(s,1),e.events.push({type:`disintegrateEnd`,id:t.id});continue}e.damageBoss(i.disintegration.bossDps*n*r*o,c)}t.nextDisintegration??=e.time+i.disintegration.first,!a.length&&s&&e.time>=t.nextDisintegration&&(t.nextDisintegration=e.time+i.disintegration.every,a.push({target:s,until:e.time+i.disintegration.duration}),e.events.push({type:`disintegrate`,id:t.id,x:t.x,z:t.z,duration:i.disintegration.duration,targetId:-1,boss:!0}));let l=t.bolts??=[];for(let t=l.length-1;t>=0;t--)e.time>=l[t].at&&(Ps(e,l[t],r*o),l.splice(t,1));if((t.cooldown-=n)>0)return;let{radius:u,maxTargets:d,duration:f}=As(e),p=Ms(e,t,u,us(e,`voidrift`)?W.voidRift:1);if(!p.length&&s&&p.push({x:s.x,z:s.z}),!p.length){t.cooldown=.2;return}t.cooldown=i.cooldown/e.rateScale/(t.rateMult??1),p.length>1&&(e.equipmentTriggers.voidrift=(e.equipmentTriggers.voidrift??0)+1),t.yaw=Math.atan2(t.x-p[0].x,t.z-p[0].z);let m=K(t,`tempest`,0);for(let n of p)e.events.push({type:`tempestShot`,x:t.x,z:t.z,tx:n.x,tz:n.z,radius:u,travel:i.travel,id:t.id}),l.push({x:n.x,z:n.z,radius:u,maxTargets:d,duration:f,at:e.time+i.travel,shot:m})}function Ps(e,t,n){let r=q.tempest,{x:i,z:a,radius:o,maxTargets:s,duration:c,shot:l}=t,u=e.time+c,d=e.boss;e.sunders.push({x:i,z:a,radius:o,until:u,duration:c});for(let t of e.splashTargets(i,a,o,s))t.sunderedUntil=u,e.damageEnemy(t,r.damage*n*((t.attributes??Le[t.kind]??[]).includes(`armored`)?1+r.armored:1),!0,l);d&&!d.dead&&Math.hypot(d.x-i,d.z-a)<o+2.5&&(d.sunderedUntil=u,e.damageBoss(r.bossDamage*n,l)),e.sunders.length>24&&e.sunders.splice(0,e.sunders.length-24)}function Fs(e,t){e.heroic.has(`tempest`)&&(t.sunderedUntil??-1)>e.time&&js(t)&&(e.rifts??=[]).push({x:t.x,z:t.z})}function Is(e,t){if(!e.rifts?.length)return;let{radius:n,damage:r,maxTargets:i}=W.riftCollapse,a=e.rifts.splice(0,12);e.rifts.length=0;let o=e.supports.find(e=>e.kind===`tempest`),s=K(o??{kind:`tempest`,id:-1},`riftcollapse`,0);for(let o of a){for(let a of e.splashTargets(o.x,o.z,n,i))e.damageEnemy(a,r*t,!0,s);e.events.push({type:`phaseImpact`,x:o.x,z:o.z},{type:`riftCollapse`,x:o.x,z:o.z,radius:n})}}function Ls(e,t,n){let r=q.carrier,i=r.deck*2/r.lanes,a=Math.sign(t.x)||-1,o=Array(r.lanes).fill(0),s=Array(r.lanes).fill(-1/0);for(let t of e.enemies){if(t.dead||t.z<r.fromZ||t.z>17.2)continue;let n=Math.max(0,Math.min(r.lanes-1,Math.floor((t.x+r.deck)/i))),a=(t.z-r.fromZ)/(N-r.fromZ);o[n]+=a*a*(Math.abs(t.x-e.x)>r.covered?r.openWeight:1)*(t.elite?1.5:1),s[n]=Math.max(s[n],t.z)}let c=new Set;for(let n of e.supports)if(n!==t&&n.hp>0&&n.claimed&&n.claimed.until>e.time)for(let e of n.claimed.lanes)c.add(e);return o.map((e,t)=>({i:t,x:-r.deck+(t+.5)*i,score:e})).map(e=>({...e,score:e.score*(Math.sign(e.x)===a?1+r.sideBias:1)*(c.has(e.i)?r.sharedWeight:1)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score).slice(0,n).map(e=>({i:e.i,x:e.x,z:Math.min(N,s[e.i]+r.lead)}))}function Rs(e,t,n,r){let i=q.carrier,a=t.interceptors??=[];if(t.hp<=0){a.length=0;return}let o=e.heroic.has(`carrier`)?W.swarmLaunch:null,s=Math.round((i.interceptors+W.interceptorBay*us(e,`interceptorbay`))*(o?.count??1)),c=1+W.quickLaunch*us(e,`quicklaunch`),l=c*e.rateScale*(t.rateMult??1),u=i.halfWidth,d=i.columns;for(;a.length<s;)a.push({id:e.nextUnitId++,x:t.x,z:t.z-1,yaw:0,phase:e.random()*6.28,run:null});a.length>s&&(a.length=s),t.strafeIn=(t.strafeIn??i.first)-n*l;let f=a.filter(e=>!e.run);if(t.strafeIn<=0&&f.length){let n=Ls(e,t,d);t.strafeIn=n.length?i.every:.3,t.claimed={lanes:n.map(e=>e.i),until:e.time+i.every/l},f.forEach((t,r)=>{let a=n[r%Math.max(1,n.length)];if(!a)return;let o=Math.floor(r/n.length);t.run={x:a.x+(o%2?1:-1)*u*.3,from:a.z,to:a.z-i.length,delay:o*i.stagger,leg:`in`,hit:new Set,boss:!1,bend:(e.random()<.5?-1:1)*(i.bend[0]+e.random()*i.bend[1]),seed:e.random()*6.28}});for(let r of n)e.events.push({type:`interceptorLaunch`,x:t.x,z:t.z,carrier:t.id,tx:r.x,tz:r.z})}let p=us(e,`gravitoncatapult`)?1+W.graviton.damage:1,m=K(t,`interceptor`,0),h=i.damage*r*(o?.damage??1)*p,g=(e,t,r)=>{let i=t-e.x,a=r-e.z;if(i*i+a*a>1e-8){let t=Math.atan2(-i,-a),r=Math.atan2(Math.sin(t-e.yaw),Math.cos(t-e.yaw));e.bank=Math.max(-.8,Math.min(.8,(e.bank??0)*.8+r/Math.max(n,.001)*.012)),e.yaw=t}e.x=t,e.z=r},_=(e,t,n,r)=>{let i=t-e.x,a=n-e.z,o=Math.hypot(i,a)||1;return{x0:e.x,z0:e.z,x1:t,z1:n,cx:(e.x+t)/2-a/o*r,cz:(e.z+n)/2+i/o*r,t:0,length:o+Math.abs(r)}},v=(e,t,r)=>{t.t=Math.min(1,t.t+r*n/t.length);let i=t.t,a=1-i;return g(e,a*a*t.x0+2*a*i*t.cx+i*i*t.x1,a*a*t.z0+2*a*i*t.cz+i*i*t.z1),i>=1},y=Math.sign(t.x)||-1;for(let s of a){s.phase+=n*5;let a=s.run;if(!a){if(s.home&&!v(s,s.home,i.speed*c*.7))continue;s.home=null;let e=t.x+Math.cos(s.phase*.4)*2.2,r=t.z-1.5+Math.sin(s.phase*.4)*1.4,a=e-s.x,o=r-s.z,l=Math.hypot(a,o);if(l>1e-6){let e=Math.min(l,i.speed*c*.5*n);g(s,s.x+a/l*e,s.z+o/l*e)}continue}if((a.delay-=n)>0)continue;if(a.leg===`in`){a.curve??=_(s,a.x,a.from,a.bend),v(s,a.curve,i.speed*c)&&(a.leg=`strafe`,a.at=a.from);continue}let l=a.at;a.at=Math.max(a.to,a.at-i.strafeSpeed*c*n);let d=a.from-a.at,f=i.weave[0]*u*Math.sin(d*i.weave[1]+a.seed)*Math.min(1,d/1.5);g(s,a.x+f,a.at);let b=0;for(let n of e.nearbyEnemies(a.x,(l+a.at)/2,u+(l-a.at)/2+.5))n.dead||a.hit.has(n)||Math.abs(n.x-a.x)>u||n.z>l+.3||n.z<a.at-.3||(a.hit.add(n),e.damageEnemy(n,h,!0,m),b++===0&&e.events.push({type:`interceptorShot`,x:s.x,z:s.z+.6,tx:n.x,tz:n.z,carrier:t.id,golden:t.skin===`goldenCarrier`}));let x=e.boss;!a.boss&&x&&!x.dead&&Math.abs(x.x-a.x)<u+2&&x.z<=l+1&&x.z>=a.at-1&&(a.boss=!0,e.damageBoss(i.bossDamage*r*(o?.damage??1)*p,m)),a.at<=a.to+.05&&(s.run=null,s.home=_(s,t.x-y*1.5,t.z-1.5,-a.bend*1.4))}}function zs(e,t,n){if(hs(e,t),e.heroic.has(`dragoon`)&&(e.salvoTimer=(e.salvoTimer??W.phaseSalvo.every)-t)<=0){e.salvoTimer=W.phaseSalvo.every;let t=W.phaseSalvo,r=K({kind:`dragoon`,id:-3},`phasesalvo`,0);for(let i of e.marines){if(i.kind!==`dragoon`||i.hp<=0)continue;let a=e.pickMarineTarget(i);if(!a||a.pod)continue;let o=a.target.x-i.x,s=a.target.z-i.z,c=Math.hypot(o,s)||1,l=o/c,u=s/c;if(e.events.push({type:`heroLine`,x:i.x,z:i.z,tx:i.x+l*t.reach,tz:i.z+u*t.reach,level:1,color:8378623}),a.boss){e.damageBoss(q.dragoon.bossDamage*t.damage*n,r);continue}let d=0;for(let a of e.nearbyEnemies(i.x+l*t.reach/2,i.z+u*t.reach/2,t.reach/2+1)){if(a.dead||d>=t.maxTargets)continue;let o=(a.x-i.x)*l+(a.z-i.z)*u;o<0||o>t.reach||Math.abs((a.x-i.x)*u-(a.z-i.z)*l)>t.halfWidth||(e.damageEnemy(a,q.dragoon.damage*t.damage*n,!0,r),d++)}}}for(let n of e.marines)n.lunge&&(n.lunge.t-=t)<=0&&(n.lunge=null);e.scarabs.length&&(e.scarabs=e.scarabs.filter(n=>(n.target&&!n.target.dead&&(n.tx=n.target.x,n.tz=n.target.z),(n.remaining-=t)>0||(ks(e,n,n.share??1),n.chain?(n.chain=!1,n.target=null,n.remaining=W.chainScarab.delay,n.share=W.chainScarab.share,e.equipmentTriggers.chainscarab=(e.equipmentTriggers.chainscarab??0)+1,!0):!1))));let r=q.zealot.whirlwind,i=r.radius+W.whirlwindRadius*us(e,`whirlwind`),a=r.damage*n*(1+W.whirlwindDamage*us(e,`whirlwind`));for(let o of e.marines){if(o.kind!==`zealot`||o.hp<=0||(o.whirlNext??=e.time+r.first+e.random(),e.time>=o.whirlNext&&(o.whirlUntil=e.time+r.duration,o.whirlNext=e.time+r.every,o.whirlTick=0,e.events.push({type:`whirlwind`,x:o.x,z:o.z,id:o.id,duration:r.duration,radius:i})),e.time>=(o.whirlUntil??-1/0)||(o.whirlTick-=t)>0))continue;o.whirlTick+=r.tick;let s=K(o,`whirlwind`,0);for(let t of e.nearbyEnemies(o.x,o.z,i))!t.dead&&Math.hypot(t.x-o.x,t.z-o.z)<i&&e.damageEnemy(t,a,!0,s);let c=e.boss;c&&!c.dead&&Math.hypot(c.x-o.x,c.z-o.z)<i+2.5&&e.damageBoss(r.bossDamage*n,s)}Is(e,n)}var Bs=(e,t)=>e.modules[t]??0,Vs=(e,t)=>e.heroic?.has(t)??!1,Hs=(e,t)=>!!Eo[e.commander]?.passives?.includes(t);function Us(e){return q.hellion.range+L.blueFlame.range*Bs(e,`blueflame`)}function Ws(e,t,n,r,i){let a=q.hellion,o=n.target,s=K(t,`lineflame`,0);t.cooldown=a.cooldown/i/(1+L.infernal*Bs(e,`infernal`)),t.attackAnimation=t.attackDuration;let c=Us(e),l=1+L.blueFlame.damage*Bs(e,`blueflame`),u=o.x-t.x,d=o.z-t.z,f=Math.hypot(u,d)||1,p=u/f,m=d/f,h=t.x+p*c,g=t.z+m*c,_=Bs(e,`blueflame`)>0;if(e.events.push({type:`lineFlame`,x:t.x,z:t.z,tx:h,tz:g,id:t.id,blue:_}),n.pod){e.damagePod(a.damage*r*l);return}if(n.boss&&e.damageBoss(a.bossDamage*r*l,s),Gs(e,t,p,m,c,a.damage*r*l,s),Vs(e,`hellion`)){let n=L.forkFlame,i=K(t,`forkflame`,0);for(let o of[-n.angle,n.angle]){let s=Math.cos(o),u=Math.sin(o),d=p*s-m*u,f=p*u+m*s;e.events.push({type:`lineFlame`,x:t.x,z:t.z,tx:t.x+d*c,tz:t.z+f*c,id:t.id,blue:_,fork:!0}),Gs(e,t,d,f,c,a.damage*r*l*n.share,i)}}Bs(e,`pyroclastic`)&&e.addBurnZone((t.x+h)/2,(t.z+g)/2,K(t,`napalm`))}function Gs(e,t,n,r,i,a,o){let s=q.hellion,c=0;for(let l of e.nearbyEnemies(t.x+n*i/2,t.z+r*i/2,i/2+1)){if(l.dead||c>=s.maxTargets)continue;let u=(l.x-t.x)*n+(l.z-t.z)*r;u<0||u>i||Math.abs((l.x-t.x)*r-(l.z-t.z)*n)>s.halfWidth||(e.damageEnemy(l,a*Kt(`hellion`,l),!0,o),c++)}}function Ks(e,t,n){let r=L.hellfire,i=K(t,`hellfire`,.1),a=e.enemies.filter(e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=r.reach).sort((e,t)=>t.maxHp-e.maxHp||t.z-e.z).slice(0,r.missiles),o=e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=r.reach+2.5?e.boss:null;o&&a.splice(0,2,o,o);for(let s of a){if(e.events.push({type:`hellfire`,x:t.x,z:t.z,tx:s.x,tz:s.z,radius:r.radius,id:t.id}),s===o){e.damageBoss(r.damage*n,i);continue}for(let t of e.splashTargets(s.x,s.z,r.radius,r.maxTargets))e.damageEnemy(t,r.damage*n,!0,i)}}function qs(e,t,n,r){if(Vs(e,`goliath`)&&e.time>=(t.nextSalvo??=e.time+L.hellfire.every)&&(t.nextSalvo=e.time+L.hellfire.every,Ks(e,t,r)),(t.cooldown-=n)>0)return;let i=q.goliath,a=i.range+L.aresClass*Bs(e,`aresclass`),o=e.enemies.filter(e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=a),s=e=>((e.attributes??[]).includes(`armored`)?100:0)+e.z,c=o.sort((e,t)=>s(t)-s(e)).slice(0,i.targets+ +!!Bs(e,`multilock`)),l=e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=a+2.5?e.boss:null;if(!c.length&&!l){t.cooldown=.15;return}t.cooldown=i.cooldown/e.rateScale/(t.rateMult??1);let u=K(t,`autocannon`,.08);for(let n of l?[l,...c].slice(0,i.targets):c)e.events.push({type:`goliathShot`,x:t.x,z:t.z,tx:n.x,tz:n.z,id:t.id}),n===l?e.damageBoss(i.bossDamage*r,u):e.damageEnemy(n,i.damage*r*Kt(`goliath`,n),!0,u)}function Js(e,t,n,r){let i=q.cyclone,a=i.range,o=t.lock,s=Vs(e,`cyclone`),c=K(t,`lockon`,0),l=(1+L.magField*Bs(e,`magfield`))*(s?L.chainLock.dps:1);if(o){let u=o.target,d=!u.dead,f=Math.hypot(u.x-t.x,u.z-t.z)<=a+3;!d||!f||e.time>=o.until?(t.lock=null,t.nextLock=e.time+(s&&!d?0:i.lockOn.cooldown*(1-L.rapidFire.relock*Bs(e,`rapidfire`))),e.events.push({type:`lockOff`,id:t.id})):u===e.boss?e.damageBoss(i.lockOn.bossDps*n*r*l,c):e.damageEnemy(u,i.lockOn.dps*n*r*l,!1,c)}if(!t.lock&&e.time>=(t.nextLock??0)){let n=e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=a?e.boss:null,r=n;if(!r)for(let n of e.enemies)!n.dead&&n.z<=17.2&&Math.hypot(n.x-t.x,n.z-t.z)<=a&&(!r||n.maxHp>r.maxHp)&&(r=n);r&&(r===n||r.maxHp>=i.lockOn.minHp)&&(t.lock={target:r,until:e.time+i.lockOn.duration},e.events.push({type:`lockOn`,id:t.id,x:t.x,z:t.z,boss:r===n}))}if((t.cooldown-=n)>0)return;let u=1+L.rapidFire.rate*Bs(e,`rapidfire`),d=null;for(let n of e.enemies)!n.dead&&n.z<=17.2&&Math.hypot(n.x-t.x,n.z-t.z)<=a&&(!d||n.z>d.z)&&(d=n);if(!d){t.cooldown=.15;return}t.cooldown=i.cooldown/u/e.rateScale/(t.rateMult??1),e.events.push({type:`cycloneShot`,x:t.x,z:t.z,tx:d.x,tz:d.z,id:t.id}),e.damageEnemy(d,i.damage*r,!0,K(t,`cyclone`,.08))}function Ys(e,t,n){let r=q.sciencevessel.arc,i=Bs(e,`arcamp`),a=e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=r.range,o=null;for(let t of e.enemies)a(t)&&(!o||t.z>o.z)&&(o=t);let s=e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=r.range+2.5?e.boss:null;if(!o&&!s)return!1;let c=K(t,`arc`,0),l=r.damage*n*(1+L.arcAmp.damage*i),u=o??s;if(e.events.push({type:`vesselArc`,id:t.id,x:t.x,z:t.z,tx:u.x,tz:u.z}),!o)return e.damageBoss(r.bossDamage*n*(1+L.arcAmp.damage*i),c),!0;let d=new Set([o]),f=[[o.x,o.z]],p=o,m=l;e.damageEnemy(o,m,!0,c);for(let t=0;t<r.jumps+L.arcAmp.jumps*i;t++){let t=null,n=r.jumpReach;for(let i of e.nearbyEnemies(p.x,p.z,r.jumpReach)){let e=Math.hypot(i.x-p.x,i.z-p.z);!i.dead&&!d.has(i)&&e<=n&&(t=i,n=e)}if(!t)break;m*=r.falloff,d.add(t),f.push([t.x,t.z]),e.damageEnemy(t,m,!0,c),p=t}return f.length>1&&e.events.push({type:`lightningBolt`,points:f,vessel:!0}),!0}function Xs(e,t,n,r){let i=q.sciencevessel.arc;t.nextArc??=e.time+i.first,e.time>=t.nextArc&&(t.nextArc=e.time+(Ys(e,t,r)?i.cooldown/e.rateScale/(t.rateMult??1):.15));let a=q.sciencevessel,o=a.repair*(1+L.nanoRepair*Bs(e,`nanorepair`)),s=null;for(let n of[e.marines,e.tanks,e.supports])for(let e of n)e===t||e.hp<=0||e.hp>=e.maxHp||Math.hypot(e.x-t.x,e.z-t.z)>a.range||(!s||e.hp/e.maxHp<s.hp/s.maxHp)&&(s=e);if(t.repairing=s,s&&(s.hp=Math.min(s.maxHp,s.hp+o*n)),Bs(e,`defensivematrix`)&&e.time>=(t.nextMatrix??0)&&s&&(t.nextMatrix=e.time+L.matrix.every,s.shield=Math.max(s.shield??0,L.matrix.absorb),s.shieldMax=Math.max(s.shieldMax??0,L.matrix.absorb),e.events.push({type:`defensiveMatrix`,x:s.x,z:s.z,id:s.id})),Vs(e,`sciencevessel`)&&e.time>=(t.nextIrradiate??=e.time+1)){let n=L.irradiate,r=new Set(e.irradiated.map(e=>e.target)),i=null;for(let a of e.enemies)!a.dead&&!r.has(a)&&a.z<=17.2&&Math.hypot(a.x-t.x,a.z-t.z)<=n.reach&&(!i||a.maxHp>i.maxHp)&&(i=a);i?(t.nextIrradiate=e.time+n.every,e.irradiated.push({target:i,until:e.time+n.duration,source:K(t,`irradiate`,0)}),e.events.push({type:`irradiate`,x:i.x,z:i.z,id:t.id,radius:n.radius})):t.nextIrradiate=e.time+.5}}function Zs(e,t,n,r){return t.hp<=0?!1:t.kind===`goliath`?(qs(e,t,n,r),!0):t.kind===`cyclone`?(Js(e,t,n,r),!0):t.kind===`sciencevessel`&&(Xs(e,t,n,r),!0)}function Qs(e){if(Hs(e,`immortality`))for(let t of[...e.tanks,...e.supports])t.hp>0||t.merc||t.wrecked||![`tank`,`thor`].includes(t.kind)||(t.wrecked=!0,e.wrecks.push({kind:t.kind,x:t.x,z:t.z,rebuildAt:e.time+L.immortality.rebuild}),e.events.push({type:`wreck`,kind:t.kind,x:t.x,z:t.z,rebuild:L.immortality.rebuild}))}function $s(e,t,n){let r=q.laserdrill,i=e.drill??={target:null,x:0,z:26},a=e=>!e.dead&&e.z>r.minZ&&e.z<=17.2,o=e.boss&&!e.boss.dead&&e.boss.z>r.minZ?e.boss:null,s=e.formedSynergies.has(`laser-lock`)?e.supports.find(e=>e.kind===`cyclone`&&e.hp>0&&e.lock&&!e.lock.target.dead)?.lock.target:null;i.joint=!!s,s?i.target=s:o&&i.target!==o&&(i.target=o);let c=(1+L.drillPower*Bs(e,`drillpower`))*(s?qe.laserLock.heat:1);if(!i.target||i.target.dead||i.target!==o&&!a(i.target)){i.target=null;for(let t of e.enemies)a(t)&&(!i.target||t.maxHp>i.target.maxHp||t.maxHp===i.target.maxHp&&t.z>i.target.z)&&(i.target=t)}let l=i.target;if(!l)return;let u=K({kind:`laserdrill`,id:-2},`drill`,0);l===e.boss?e.damageBoss(r.bossDps*t*n*c,u):e.damageEnemy(l,r.dps*t*n*c,!1,u)}function ec(e,t,n){if(Hs(e,`laserdrill`)&&$s(e,t,n),e.irradiated.length){let r=L.irradiate;e.irradiated=e.irradiated.filter(i=>{if(i.target.dead||e.time>=i.until)return!1;e.damageEnemy(i.target,r.dps*t*n,!1,i.source);for(let a of e.splashTargets(i.target.x,i.target.z,r.radius,r.maxTargets+1))a!==i.target&&e.damageEnemy(a,r.splashDps*t*n,!1,i.source);return!0})}if(Hs(e,`immortality`)){let{regen:n,delay:r}=L.immortality;for(let i of[e.marines,e.tanks,e.supports])for(let a of i)a.hp>0&&a.hp<a.maxHp&&e.time-(a.lastHitAt??-1/0)>=r&&(a.hp=Math.min(a.maxHp,a.hp+n*t))}e.wrecks.length&&(e.wrecks=e.wrecks.filter(t=>{if(e.time<t.rebuildAt)return!0;t.kind===`tank`?e.addTank(`tank`):e.addSupport(`thor`,{rebuilt:!0});let n=(t.kind===`tank`?e.tanks:e.supports).at(-1);return n&&(n.x=t.x,n.z=t.z,n.arrival=0),e.events.push({type:`rebuilt`,kind:t.kind,x:t.x,z:t.z}),!1}))}var tc=[`thor`,`immortal`,`colossus`,`templar`],nc=(e,t,n=null)=>n?.merc===`odin`?kn.range:Hn(t,e.modules).range,rc=(e,t)=>Hn(t,{weapon:e.weaponLevel-1,...e.modules},e.researchLevel,e.overdrive>0,e.buffScale,e.rateScale);function ic(e,t){let n=nc(e,t.kind,t),r=e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=n;if(e.boss&&r(e.boss))return e.boss;let i=null,a=-1/0;for(let n of e.enemies){if(!r(n))continue;let o=((n.attributes??[]).includes(`armored`)?100:n.kind===`baneling`?30:0)+n.z,s=t.kind===`thor`?(n.z>q.thor.guardZ-(e.frontAdvance??0)||n.clawing?200:0)+o:t.kind===`immortal`?(n.clawing?200:0)+o:-Math.abs(n.z-2)-Math.abs(n.x-e.x)*.5;s>a&&(i=n,a=s)}return i}function ac(e,t,n,r,i){let{hops:a,radius:o}=q.immortal.carry,s=t,c=n;for(let t=0;t<=a&&s&&c>0;t++){let n=s.hp;if(e.damageEnemy(s,t===0?c:Math.min(c,yn(r,s)),!1,i),!s.dead)break;c-=n;let a=null,l=o;for(let t of e.nearbyEnemies(s.x,s.z,o)){let e=Math.hypot(t.x-s.x,t.z-s.z);!t.dead&&e<l&&(a=t,l=e)}a&&c>0&&e.events.push({type:`phaseCarry`,x:s.x,z:s.z,tx:a.x,tz:a.z,presentationDelay:i.presentationDelay}),s=a}}function oc(e,t,n=null){let r=ic(e,t);if(!r)return;let i=rc(e,t.kind),a=t.damageMult??1,o=t.kind===`thor`,s=K(t,n??(o?`thorCannon`:`phaseCannon`),zn[o?`thorCannon`:`phaseCannon`]);t.yaw=Math.atan2(t.x-r.x,t.z-r.z),t.recoil=1,t.barrel=1-(t.barrel??0);let c=(t.barrel?1:-1)*(o?1.08:.85),l=t.x+c*Math.cos(t.yaw)-.85*Math.sin(t.yaw),u=t.z-c*Math.sin(t.yaw)-.85*Math.cos(t.yaw),d=o||r===e.boss||yn(i,r)*a>=r.hp?0:Math.min(.55,(r.speed??0)*s.presentationDelay*.8);if(e.events.push({type:o?`thorShot`:`phaseShot`,x:l,y:(o?2.3:1.3)*(t.scale??1),z:u,tx:r.x,tz:r.z+d,radius:i.radius,equipment:n,flight:s.presentationDelay}),e.shotsFired++,o){for(let t of e.nearbyEnemies(r.x,r.z,i.radius))!t.dead&&Math.hypot(t.x-r.x,t.z-r.z)<i.radius&&e.damageEnemy(t,yn(i,t)*a,!0,s);e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-r.x,e.boss.z-r.z)<i.radius&&e.damageBoss(i.bossDamage*a,s)}else r===e.boss?e.damageBoss(i.bossDamage*a,s):t.kind===`immortal`?ac(e,r,yn(i,r)*a,i,s):e.damageEnemy(r,yn(i,r)*a,!1,s);n&&e.equipmentTriggers[n]++}function sc(e,t,r){let i=n.shieldPerLevel*(e.modules.plasmashield??0);if(t.shieldMax=i,!i||t.hp<=0){t.shield=Math.min(t.shield??0,i);return}t.shield??=i,e.time-(t.lastHitAt??-1/0)>=it.delay&&(t.shield=Math.min(i,t.shield+it.regen*r))}function cc(e,t){let r=n.squadWard*(e.modules.plasmashield??0);if(r)for(let n of e.allies){if(n.kind===`templar`||n.hp<=0)continue;let i=r-(n.wardMax??0);n.wardMax=r,i>0&&(n.ward=(n.ward??0)+i),e.time-(n.lastHitAt??-1/0)>=it.delay&&(n.ward=Math.min(r,n.ward+it.regen*t))}}function lc(e,t){let n=nc(e,`immortal`),{radius:r}=q.immortal.barrage,i=e=>!e.dead&&e.z<=17.2&&Math.hypot(e.x-t.x,e.z-t.z)<=n,a=[],o=[];for(let t of e.enemies)i(t)&&((t.attributes??[]).includes(`armored`)?a:o).push(t);let s=a.length?a:o;if(!s.length)return null;let c=null,l=-1;for(let t=0;t<Math.min(20,s.length);t++){let t=s[Math.floor(e.random()*s.length)],n=0;for(let i of e.nearbyEnemies(t.x,t.z,r*1.8))i.dead||(n+=(i.attributes??[]).includes(`armored`)?3:.3);n>l&&(c=t,l=n)}return{x:c.x,z:c.z}}function uc(e,t,n){if(t.dead||t.clawing||t.frozen>0||t.lifted>0)return 0;let r=e.frontZ,i=t.kind===`roach`?r-_e.roach.range:t.kind===`aberration`?r-_e.aberration.reach:r;return Math.max(0,Math.min(e.enemySpeed(t)*n,i-t.z))}function dc(e,t){let n=q.immortal.barrage;if(t.barrageAt??=e.time+n.first,e.time<t.barrageAt)return;let r=lc(e,t);if(!r){t.barrageAt=e.time+.5;return}t.barrageAt=e.time+n.every;let i=rc(e,`immortal`),a=K(t,`phaseBarrage`,0),o=[],s=e.nearbyEnemies(r.x,r.z,n.radius*1.8).filter(e=>!e.dead&&Math.hypot(e.x-r.x,e.z-r.z)<=n.radius*1.8),c=s.filter(e=>(e.attributes??[]).includes(`armored`)),l=c.length?c:s,u=t=>l.length?l.reduce((n,r)=>n+uc(e,r,t),0)/l.length:0;for(let t=0;t<n.shells;t++){let i=e.random()*Math.PI*2,a=Math.sqrt(e.random())*n.scatter,s=n.lead+t*n.over/n.shells,c=r.z+Math.sin(i)*a*.8;o.push({x:r.x+Math.cos(i)*a,z:c+u(s),voidZ:c,delay:s})}for(let n of o)e.barrageShells.push({...n,stats:i,source:a,unit:t});t.attackAnimation=t.attackDuration=.8,e.events.push({type:`phaseBarrage`,x:t.x,z:t.z,tx:r.x,tz:r.z,shells:o.map(e=>({...e}))})}function fc(e,t,n=B.radius,r=!1){let i=nc(e,`thor`,t),a=[];for(let n of e.enemies)!n.dead&&n.z<=17.2&&Math.hypot(n.x-t.x,n.z-t.z)<=i&&a.push(n);if(r&&e.boss&&!e.boss.dead&&e.boss.z<=17.2&&Math.hypot(e.boss.x-t.x,e.boss.z-t.z)<=i&&a.push(e.boss),!a.length)return null;let o=null,s=-1,c=Math.min(20,a.length);for(let t=0;t<c;t++){let i=a[Math.floor(t*a.length/c)],l=0;for(let t of e.nearbyEnemies(i.x,i.z,n))t.dead||(l+=(t.attributes??[]).includes(`armored`)?2:1);r&&e.boss&&!e.boss.dead&&Math.hypot(e.boss.x-i.x,e.boss.z-i.z)<=n&&(l+=4),l>s&&(o=i,s=l)}return{x:o.x,z:o.z}}function pc(e,t){let n=kn.barrage;if(t.odinBarrage){if(t.abilityAnimation=cn(e.time-t.odinBarrage.start),t.abilityAnimation)return!0;t.odinBarrage=null}if(t.odinBarrageAt??=e.time+n.first,e.time<t.odinBarrageAt)return;let r=fc(e,t,n.scatter+n.radius,!0);if(!r)return;t.odinBarrageAt=e.time+n.every,t.odinBarrage={start:e.time,until:e.time+n.deploy+n.shells*n.interval+n.recover},t.abilityAnimation=cn(0),t.yaw=Math.atan2(t.x-r.x,t.z-r.z),t.attackAnimation=0,t.recoil=0,e.supportRounds=e.supportRounds.filter(e=>e.unit!==t);let i=rc(e,`thor`),a=K(t,`odinBarrage`,0),o=[];for(let e=0;e<n.shells;e++){let t=e*2.399963229728653,i=e%4==0?0:n.scatter*Math.sqrt(e*7%n.shells/(n.shells-1));o.push({x:r.x+Math.cos(t)*i,z:r.z+Math.sin(t)*i,delay:n.deploy+n.lead+e*n.interval,barrel:e%4})}for(let n of o)e.barrageShells.push({...n,stats:i,source:a,unit:t,style:`odin`,mult:t.damageMult??1});return e.equipmentTriggers.odinBarrage++,e.events.push({type:`bombardment`,weapon:`odinBarrage`,x:t.x,z:t.z,tx:r.x,tz:r.z,unit:t,deploy:n.deploy,flight:n.lead,muzzleScale:t.scale??1,areaRadius:n.scatter+n.radius,shells:o.map(e=>({...e}))}),!0}function mc(e,t){if(t.bombardAt??=e.time+B.first,e.time<t.bombardAt)return;let n=fc(e,t);if(!n){t.bombardAt=e.time+.5;return}t.bombardAt=e.time+B.every;let r=rc(e,`thor`),i=K(t,`bombardment`,0),a=[];for(let e=0;e<B.shells;e++){let r=t.id+e*Math.PI*2/B.shells,i=B.radius/3;a.push({x:n.x+Math.cos(r)*i,z:n.z+Math.sin(r)*i,delay:B.lead+e*B.interval})}for(let n of a)e.barrageShells.push({...n,stats:r,source:i,unit:t,style:`bombard`,mult:t.damageMult??1});t.attackAnimation=t.attackDuration=.8,e.equipmentTriggers.bombardment++,e.events.push({type:`bombardment`,x:t.x,z:t.z,tx:n.x,tz:n.z,shells:a.map(e=>({...e}))})}function hc(e,t){let{stats:n,mult:r}=t,i=t.style===`odin`?kn.barrage:B;for(let a of e.splashTargets(t.x,t.z,i.radius,i.maxTargets))e.damageEnemy(a,yn(n,a)*i.damage*r,!0,t.source),i.knockback&&!a.dead&&!a.big&&(a.z=Math.max(i.spawnZ,a.z-i.knockback));let a=e.boss;a&&!a.dead&&Math.hypot(a.x-t.x,a.z-t.z)<i.radius+1.5&&e.damageBoss(n.bossDamage*i.damage*r,t.source),e.events.push({type:`bombardmentHit`,weapon:t.source.weapon,x:t.x,z:t.z,radius:i.radius})}function gc(e,t){let n=q.immortal.barrage;e.barrageShells=e.barrageShells.filter(r=>{if(r.style===`odin`&&r.unit.hp<=0&&r.delay>kn.barrage.lead)return!1;if(r.delay-=t,r.style===`odin`&&!r.launched&&r.delay<=kn.barrage.lead&&(r.launched=!0,e.events.push({type:`odinBarrageLaunch`,x:r.unit.x,z:r.unit.z,barrel:r.barrel})),r.delay>0)return!0;if(r.style===`bombard`||r.style===`odin`)return hc(e,r),!1;let i=r.stats.armoredDamage/r.stats.damage;for(let t of e.splashTargets(r.x,r.z,n.radius,n.maxTargets)){let a=(t.attributes??[]).includes(`armored`);e.damageEnemy(t,n.damage*r.stats.scale*(a?i:1),!0,r.source)}let a=e.boss;return a&&!a.dead&&Math.hypot(a.x-r.x,a.z-r.z)<n.radius+1.5&&e.damageBoss(n.bossDamage*r.stats.scale,r.source),e.events.push({type:`phaseBarrageHit`,x:r.x,z:r.z}),e.heroic.has(`immortal`)&&e.addVoidZone(r.x,r.voidZ??r.z,K(r.unit,`voidZone`,0)),!1})}function _c(e,t,n,r){let{infantry:i,heavy:a,pet:o}=ft.body,s=[],c=(e,i)=>{e.hp>0&&Math.abs(e.x-t)<=r+i&&Math.abs(e.z-n)<=r+i&&s.push({x:e.x,z:e.z,size:i})};for(let t of e.marines)c(t,i);for(let t of e.tanks)c(t,a);for(let t of e.supports)c(t,a);return e.pet?.alive&&Number.isFinite(e.pet.x)&&c(e.pet,o),s}function vc(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c?Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c)):0;return Math.hypot(e-n-o*l,t-r-s*l)}var yc=(e,t,n,r,i,a)=>e.every(e=>vc(e.x,e.z,t,n,r,i)>=a+e.size);function bc(e,t,n,r=null){let{range:i,deepMinZ:a,deepMaxZ:o}=q.templar,s=[],c=[];for(let n of e.enemies)n.dead||(n.z>=a&&n.z<=o?s.push(n):n.z<t.z-1&&Math.hypot(n.x-t.x,n.z-t.z)<=i&&c.push(n));let l=s.length?s:c;if(!l.length)return null;let u=null,d=0;for(let t=0;t<Math.min(24,l.length);t++){let t=l[Math.floor(e.random()*l.length)];if(r&&Math.hypot(t.x-r.x,t.z-r.z)<n*1.6||e.storms.some(e=>Math.hypot(t.x-e.x,t.z-e.z)<(n+e.radius)*.8)||!yc(_c(e,t.x,t.z,n+ft.margin),t.x,t.z,t.x,t.z,n+ft.margin))continue;let i=e.nearbyEnemies(t.x,t.z,n).filter(e=>!e.dead&&Math.hypot(e.x-t.x,e.z-t.z)<n).length;i>d&&(u=t,d=i)}return u&&{x:u.x,z:u.z}}function xc(e,t,n,r=null){let i=bc(e,t,n.radius,r);if(!i)return null;let a=q.templar,o=e.synergyScale(`storm-front`);return e.storms.push({...i,radius:n.radius,remaining:a.duration,tick:0,damage:n.damage*o,bossDamage:n.bossDamage*o,source:K(t,r?`twinstorm`:`storm`)}),e.events.push({type:`storm`,...i,radius:n.radius,duration:a.duration,twin:!!r}),i}function Sc(e,t,n){for(let r of e.storms)Math.hypot(r.x-t,r.z-n)<r.radius&&Cc(e,r)}function Cc(e,t){let n=t=>e.storms.every(e=>Math.hypot(t.x-e.x,t.z-e.z)>=e.radius),r=_c(e,t.x,t.z,t.radius+U.reach+U.jumps*U.jumpReach),i=(t,i,a,o)=>{let s=null,c=a;for(let l of e.nearbyEnemies(t,i,a)){if(l.dead||o.has(l)||!n(l)||r.length&&!yc(r,t,i,l.x,l.z,ft.bolt))continue;let e=Math.hypot(l.x-t,l.z-i);(e<c||e===c&&s&&l.id<s.id)&&(s=l,c=e)}return s&&{target:s,distance:c}},a=new Set,o={...t.source,weapon:`lightning`,presentationDelay:0},s=i(t.x,t.z,t.radius+U.reach,a),c=e.boss,l=c&&!c.dead&&n(c)&&yc(r,t.x,t.z,c.x,c.z,ft.bolt)?Math.hypot(c.x-t.x,c.z-t.z):1/0,u=l<t.radius+U.reach&&(!s||l<s.distance);if(!s&&!u)return;let d=u?c:s.target,f=Math.hypot(d.x-t.x,d.z-t.z)||1,p=[[t.x+(d.x-t.x)/f*t.radius,t.z+(d.z-t.z)/f*t.radius],[d.x,d.z]];if(e.equipmentTriggers.lightning++,u){e.damageBoss(t.bossDamage*U.damage,o),e.events.push({type:`lightningBolt`,points:p});return}let m=s.target,h=t.damage*U.damage;for(let t=0;m&&(a.add(m),e.damageEnemy(m,h,!1,o),!(t>=U.jumps));t++){let e=i(m.x,m.z,U.jumpReach,a);if(!e)break;m=e.target,h*=U.falloff,p.push([m.x,m.z])}e.events.push({type:`lightningBolt`,points:p})}function wc(e,t,n){let r=q.templar,i=e.heroic.has(`templar`);e.storms=e.storms.filter(a=>{let o=a.z+n*t;if(yc(_c(e,a.x,o,a.radius+ft.margin),a.x,o,a.x,o,a.radius+ft.margin)&&(a.z=o),i&&(a.bolt=(a.bolt??U.every)-t)<=0&&(a.bolt+=U.every,Cc(e,a)),(a.tick-=t)<=0){a.tick+=r.tick;let t=0;for(let n of e.splashTargets(a.x,a.z,a.radius,r.maxTargets*2))n.stormTick===e.time||t>=r.maxTargets||(n.stormTick=e.time,t++,e.damageEnemy(n,a.damage,!0,a.source));let n=e.boss;n&&!n.dead&&n.stormTick!==e.time&&Math.hypot(n.x-a.x,n.z-a.z)<a.radius+1.5&&(n.stormTick=e.time,e.damageBoss(a.bossDamage,a.source)),e.events.push({type:`stormTick`,x:a.x,z:a.z,radius:a.radius,hits:t})}return(a.remaining-=t)>0})}function Tc(e,t,n=0){cc(e,t),wc(e,t,n),ls(e,t,n),gc(e,t),e.supportRounds=e.supportRounds.filter(n=>(n.delay-=t,n.delay>0||(n.unit.hp>0&&!n.unit.odinBarrage&&oc(e,n.unit,n.equipment),!1)));for(let n of e.supports){if(n.kind===`colossus`){os(e,n,t);continue}if(n.kind===`carrier`){Rs(e,n,t,e.damageScale*(n.damageMult??1));continue}if(Zs(e,n,t,e.damageScale*(n.damageMult??1)))continue;if(n.kind===`tempest`){Ns(e,n,t,e.damageScale*(n.damageMult??1));continue}if(n.kind===`darktemplar`){Ds(e,n,t,e.damageScale*(n.damageMult??1));continue}if(n.kind===`phoenix`){Es(e,n,t,e.damageScale*(n.damageMult??1));continue}if(n.kind===`templar`){if(sc(e,n,t),n.hp<=0||(n.cooldown-=t)>0)continue;let r=rc(e,`templar`),i=xc(e,n,r);if(!i){n.cooldown=.25;continue}n.cooldown=r.cooldownMin,n.volley=(n.volley??0)+1,n.attackAnimation=n.attackDuration=1.1,e.shotsFired++,e.modules.twinstorm&&n.volley%sr.twinstorm.every===0&&xc(e,n,r,i)&&e.equipmentTriggers.twinstorm++;continue}if(n.kind===`immortal`&&n.hp>0&&e.modules.phasebarrage&&dc(e,n),n.merc===`odin`&&n.hp>0&&pc(e,n)||(n.kind===`thor`&&n.hp>0&&e.heroic.has(`thor`)&&mc(e,n),n.hp<=0||(n.cooldown-=t)>0||!ic(e,n)))continue;let r=rc(e,n.kind);n.cooldown=r.cooldownMin/(n.rateMult??1),n.volley=(n.volley??0)+1,n.attackAnimation=n.attackDuration=Math.min(.8,r.cooldownMin),oc(e,n),e.supportRounds.push({unit:n,delay:.12});let i=n.kind===`thor`?`barrage`:`resonance`,a=sr[i],o=e.synergyCount(n.kind===`thor`?`thunder-battery`:`phase-resonance`);if(e.modules[i]&&n.volley%a.every===0)for(let t=0;t<a.rounds+o;t++)e.supportRounds.push({unit:n,equipment:i,delay:.24+t*a.spacing})}}var Ec={terran:[[`Jeff`,`杰夫`],[`Scott`,`斯科特`],[`Earl`,`厄尔`],[`Marcus`,`马库斯`],[`Dolores`,`多洛雷斯`],[`Hank`,`汉克`],[`Rosa`,`罗莎`],[`Duke`,`杜克`],[`Vince`,`文斯`],[`Gus`,`格斯`],[`Tex`,`泰克斯`],[`Lou`,`卢`],[`Mags`,`麦格丝`],[`Boone`,`布恩`],[`Cody`,`科迪`],[`Wendell`,`温德尔`],[`Otis`,`奥蒂斯`],[`Nadia`,`娜迪亚`],[`Rex`,`雷克斯`],[`Harlan`,`哈兰`],[`Big Walt`,`大沃尔特`],[`Pearl`,`珀尔`],[`Cyrus`,`赛勒斯`],[`Marlene`,`玛琳`],[`Dutch`,`达奇`],[`Odell`,`奥德尔`],[`Greta`,`格蕾塔`],[`Bishop`,`毕肖普`],[`Roscoe`,`罗斯科`],[`Junie`,`朱妮`],[`Abel`,`亚伯`],[`Lonnie`,`朗尼`],[`Ruth`,`露丝`],[`Kirby`,`柯比`],[`Silas`,`赛拉斯`],[`Marge`,`玛姬`],[`Cleve`,`克利夫`],[`Ida`,`艾达`],[`Buck`,`巴克`],[`Selma`,`塞尔玛`],[`Ike`,`艾克`],[`Wanda`,`旺达`],[`Grady`,`格雷迪`],[`Norma`,`诺玛`],[`Chester`,`切斯特`],[`Roy`,`罗伊`],[`Vera`,`薇拉`],[`Tully`,`塔利`],[`Hazel`,`黑兹尔`],[`Merle`,`默尔`],[`Ernie`,`厄尼`],[`Faye`,`费伊`],[`Ramona`,`拉莫娜`],[`Dell`,`戴尔`],[`Ophelia`,`奥菲莉娅`],[`Carl`,`卡尔`],[`Birdie`,`伯迪`],[`Dwight`,`德怀特`],[`Lucille`,`露西尔`],[`Jonas`,`约纳斯`],[`Opal`,`奥帕尔`],[`Rufus`,`鲁弗斯`],[`Stella`,`斯特拉`],[`Amos`,`阿莫斯`],[`Trudy`,`特鲁迪`],[`Emmett`,`埃米特`],[`Winnie`,`温妮`],[`Gordo`,`戈尔多`],[`Cass`,`卡丝`],[`Barney`,`巴尼`],[`Delia`,`迪莉娅`],[`Sully`,`萨利`],[`Maude`,`莫德`],[`Curt`,`柯特`],[`Lorna`,`洛娜`],[`Hollis`,`霍利斯`],[`Peg`,`佩格`],[`Ramsey`,`拉姆齐`],[`Ivy`,`艾薇`],[`Doyle`,`多伊尔`],[`Bess`,`贝丝`],[`Travis`,`特拉维斯`],[`Nellie`,`内莉`],[`Jonah`,`乔纳`],[`Sadie`,`萨迪`],[`Wade`,`韦德`],[`Iris`,`艾里斯`],[`Clay`,`克莱`],[`Edna`,`埃德娜`],[`Ford`,`福特`],[`Reva`,`蕾娃`],[`Mitch`,`米奇`],[`Della`,`黛拉`],[`Ogden`,`奥格登`],[`Fern`,`弗恩`],[`Royce`,`罗伊斯`],[`Marta`,`玛尔塔`],[`Kell`,`凯尔`],[`Junior`,`小约翰`],[`Thea`,`西娅`],[`Bram`,`布拉姆`],[`Noelle`,`诺埃尔`],[`Quint`,`昆特`],[`Deke`,`迪克`],[`Sable`,`赛博`]],protoss:[[`Kaeldar`,`凯尔达`],[`Talvaan`,`塔尔万`],[`Anaras`,`阿纳拉斯`],[`Veloth`,`维洛斯`],[`Ishtar`,`伊什塔`],[`Jaelon`,`杰隆`],[`Ravanar`,`拉瓦纳`],[`Khalor`,`卡洛尔`],[`Taldris`,`塔德里斯`],[`Oriel`,`奥里尔`],[`Nerazo`,`内拉佐`],[`Kerathis`,`克拉西斯`],[`Tassar`,`塔萨`],[`Elunor`,`伊卢诺`],[`Xanthar`,`赞萨`],[`Amarath`,`阿玛拉斯`],[`Solenar`,`索勒纳`],[`Dravos`,`德拉沃斯`],[`Ilvaris`,`伊尔瓦里斯`],[`Maelor`,`梅洛尔`],[`Zheledis`,`泽勒迪斯`],[`Auralen`,`奥拉伦`],[`Verrak`,`维拉克`],[`Sylthar`,`希尔萨`],[`Oraneth`,`奥拉内斯`],[`Kelvaris`,`凯尔瓦里斯`],[`Tharion`,`萨里昂`],[`Nymaris`,`尼玛里斯`],[`Zorael`,`佐拉埃尔`],[`Callidar`,`卡利达`],[`Ethanar`,`伊萨纳`],[`Varethi`,`瓦雷西`],[`Lumeth`,`卢梅斯`],[`Sarkaal`,`萨尔卡`],[`Orvath`,`奥瓦斯`],[`Kyrenis`,`基雷尼斯`],[`Talareth`,`塔拉雷斯`],[`Zeldrin`,`泽尔德林`],[`Myrandor`,`米兰多`],[`Ashareth`,`阿沙雷斯`],[`Velkaan`,`维尔坎`],[`Thoradis`,`索拉迪斯`],[`Enkaris`,`恩卡里斯`],[`Solveth`,`索尔维斯`],[`Draemar`,`德雷马`],[`Ilthara`,`伊尔萨拉`],[`Nexaris`,`奈克萨里斯`],[`Auvalen`,`奥瓦伦`],[`Kryssar`,`克里萨`],[`Tevareth`,`特瓦雷斯`],[`Zalmaris`,`扎尔玛里斯`],[`Orithan`,`奥里桑`],[`Velareth`,`维拉雷斯`],[`Khadros`,`卡德罗斯`],[`Synthar`,`辛萨`],[`Maelvar`,`梅尔瓦`],[`Torvaan`,`托尔万`],[`Elandris`,`伊兰德里斯`],[`Zerathis`,`泽拉西斯`],[`Ulmaren`,`乌尔玛伦`],[`Karvos`,`卡沃斯`],[`Nirathel`,`尼拉塞尔`],[`Sevalen`,`塞瓦伦`],[`Aldreth`,`奥德雷斯`],[`Vorian`,`沃里安`],[`Themis`,`瑟弥斯`],[`Kaladan`,`卡拉丹`],[`Orisol`,`奥里索`],[`Zhaleth`,`扎莱斯`],[`Marvath`,`玛瓦斯`],[`Enyaris`,`恩雅里斯`],[`Talioth`,`塔利奥斯`],[`Sundris`,`桑德里斯`],[`Valkaris`,`瓦尔卡里斯`],[`Nolareth`,`诺拉雷斯`],[`Erythan`,`厄里桑`],[`Zaelith`,`泽利斯`],[`Kormaris`,`科玛里斯`],[`Athanel`,`阿萨内尔`],[`Vesparin`,`维斯帕林`],[`Lorathen`,`洛拉森`],[`Dyareth`,`迪亚雷斯`],[`Solmaran`,`索尔玛兰`],[`Keshtar`,`凯什塔`],[`Ariveth`,`阿里维斯`],[`Thalvos`,`萨尔沃斯`],[`Numaren`,`努玛伦`],[`Izareth`,`伊扎雷斯`],[`Corvaal`,`科尔瓦`],[`Selareth`,`塞拉雷斯`],[`Phaeris`,`斐里斯`],[`Odranel`,`奥德拉内尔`],[`Yvareth`,`伊瓦雷斯`],[`Tremaris`,`特雷马里斯`],[`Kaevos`,`凯沃斯`],[`Alyndor`,`阿林多`],[`Zethara`,`泽萨拉`],[`Mirvath`,`米尔瓦斯`],[`Unaris`,`乌纳里斯`],[`Serathos`,`塞拉索斯`],[`Ithuriel`,`伊苏里尔`],[`Vantharis`,`万萨里斯`],[`Elorvan`,`伊洛尔万`],[`Kashiel`,`卡希尔`],[`Zorvanis`,`佐尔瓦尼斯`]],rifles:[[`Steel Rain`,`钢雨`],[`Iron Wolves`,`铁狼`],[`Bridge Rats`,`桥头鼠`],[`Last Call`,`最后一轮`],[`Cold Coffee`,`冷咖啡`],[`Lucky Sevens`,`幸运七`],[`Night Shift`,`夜班`],[`Grave Diggers`,`掘墓人`],[`Rust Buckets`,`锈桶`],[`Paper Tigers`,`纸老虎`],[`Stray Dogs`,`野狗`],[`Loud Neighbors`,`吵闹邻居`],[`Overtime`,`加班组`],[`No Refunds`,`概不退款`],[`Bad News`,`坏消息`],[`Short Fuse`,`短引信`],[`Second Helping`,`再来一份`],[`Dust Devils`,`沙尘魔`],[`Sandbaggers`,`沙袋`],[`Mud Larks`,`泥云雀`],[`Hold My Beer`,`扶我一把`],[`Free Refills`,`无限续杯`],[`Ammo Surplus`,`弹药盈余`],[`Bad Haircut`,`烂发型`],[`Night Owls`,`夜猫子`],[`Cheap Seats`,`便宜座`],[`The Usual`,`老样子`],[`Late Rent`,`欠租`],[`Loose Change`,`零钱`],[`Dead Battery`,`没电了`],[`Wrong Turn`,`走错路`],[`Twelve Pack`,`一打`],[`Break Room`,`休息室`],[`Backlog`,`积压`],[`Cold Open`,`冷场`],[`Three Spares`,`三个备件`],[`Hazard Pay`,`危险津贴`],[`Rain Check`,`改天`],[`Split Shift`,`两头班`],[`Hard Water`,`硬水`],[`Sunday Drivers`,`周日司机`],[`Open Tab`,`记账`],[`Bent Nails`,`弯钉子`],[`Spare Ribs`,`肋排`],[`Tin Cans`,`铁皮罐`],[`Low Ceiling`,`低天花板`],[`Fire Drill`,`消防演习`],[`Half Measures`,`半吊子`],[`Coin Flip`,`抛硬币`],[`Long Shift`,`长班`]],flame:[[`Burn Unit`,`烧伤科`],[`Hot Plate`,`热盘`],[`Pilot Light`,`常明火`],[`Charcoal`,`木炭`],[`Kindling`,`引火柴`],[`Smoke Break`,`烟歇`],[`Barbecue`,`烧烤队`],[`Flashpoint`,`燃点`],[`Backdraft`,`回燃`],[`Cinders`,`余烬`],[`Blacktop`,`柏油`],[`Firewalkers`,`踏火者`],[`Scorchers`,`焦土队`],[`Torchlight`,`火把`],[`Slow Roast`,`慢烤`],[`Well Done`,`全熟`],[`Brimstone`,`硫磺`],[`Heat Wave`,`热浪`],[`Spark Plugs`,`火花塞`],[`Tinderbox`,`火绒盒`],[`Dry Season`,`旱季`],[`Oven Mitts`,`隔热手套`],[`Second Degree`,`二度烧伤`],[`Open Flame`,`明火`],[`Grill Marks`,`烤痕`],[`Short Order`,`快炒`],[`Ash Tray`,`烟灰缸`],[`Furnace`,`熔炉`],[`Ember Bay`,`余烬湾`],[`Hot Iron`,`热铁`],[`Welders`,`电焊工`],[`Smoke Stack`,`烟囱`],[`Pressure Cooker`,`高压锅`],[`Flare Stack`,`火炬塔`],[`Boiler Room`,`锅炉房`],[`Hotheads`,`急脾气`],[`Slag`,`炉渣`],[`Dragon Breath`,`龙息`],[`Crisper`,`焦脆`],[`Blast Furnace`,`高炉`],[`Matchbook`,`火柴簿`],[`Deep Fryers`,`油炸组`],[`Sunburn`,`晒伤`],[`Chili Oil`,`辣油`],[`Kiln`,`窑`],[`Scald`,`烫伤`],[`Wildcat`,`野火猫`],[`Coke Oven`,`焦炉`],[`Hot Sauce`,`辣酱`],[`Flint`,`燧石`]]},Dc={marine:`rifles`,firebat:`flame`,tank:`terran`,thor:`terran`,immortal:`protoss`,colossus:`protoss`,templar:`protoss`,dragoon:`protoss`,zealot:`protoss`,reaver:`protoss`,carrier:`protoss`,tempest:`protoss`,darktemplar:`protoss`,phoenix:`protoss`,hellion:`flame`,goliath:`terran`,cyclone:`terran`,sciencevessel:`terran`},Oc=[`marine`,`firebat`,`dragoon`,`zealot`,`hellion`];function kc(e,t){if(!e)return null;let[n,r]=e.split(`:`),i=Ec[n]?.[Number(r)];if(!i)throw Error(`Unknown hero name: ${e}`);return t===`en`?i[0]:i[1]}var Ac=e=>e+1,jc={speedFreaks:{speed:1.2},barrier:{shield:.2,duration:2},justDie:{delay:.9,chance:.25}},Mc=[`speedFreaks`,`barrier`,`justDie`],Z={layerSeconds:30,firstLayerDelay:4,quickenFrom:10,quicken:.92,layerSecondsMin:18,hpGrowth:1.12,countGrowth:1.06,damageGrowth:1.08,armorPerLayer:.1,hpGrowthLate:1.1,hpGrowthLateFrom:16,kindHpGrowth:{aberration:{early:1.11,late:1.09}},firstGate:8,gateAfterCrest:25,marineCap:64,tankCap:6,capGrowthFrom:3,marinesPerLayer:2,tankEvery:3,marineCapMax:96,tankCapMax:9,supportCap:3,supportEvery:3,supportCapMax:8,thorCap:4,bossEvery:3,bossOffset:15,bossHp:4400,bossHpGrowth:1.3,lineRepair:150,mutatorLayers:[2,5,8],elite:{from:4,step:.02,max:.25,zerglingShare:.25,hp:2.5,kindHp:{aberration:1.75},scale:1.3},boost:{damage:.03,rate:.02},powerGrowth:1.1},Nc=[`boostDamage`,`boostRate`],Pc=(e,t=null)=>{let n=t?Z.kindHpGrowth[t]:null;return(n?.early??Z.hpGrowth)**Math.max(0,Math.min(e,Z.hpGrowthLateFrom)-1)*(n?.late??Z.hpGrowthLate)**Math.max(0,e-Z.hpGrowthLateFrom)};function Fc(e,t){if(e<Z.elite.from||t===`baneling`)return 0;let n=Math.min(Z.elite.max,(e-Z.elite.from+1)*Z.elite.step);return t===`zergling`?n*Z.elite.zerglingShare:n}var Ic={swarm:{count:1,banelings:1,roaches:1,hydralisks:1,aberrations:1},armored:{count:.3,banelings:.5,roaches:2.6,hydralisks:1,aberrations:2},den:{count:.45,banelings:.6,roaches:1.4,hydralisks:2.4,aberrations:1},tide:{count:.55,banelings:2.2,roaches:.6,hydralisks:.5,aberrations:1}},Lc=[`swarm`,`armored`,`den`,`tide`];function Rc(e,t){let n=Ic[t],r={...e,mix:t};for(let t of Object.keys(n))e[t]&&(r[t]=Math.round(e[t]*n[t]));return r}function zc(e){return Math.max(Z.layerSecondsMin,Z.layerSeconds*Z.quicken**Math.max(0,e-Z.quickenFrom))}var Bc=e=>zc(e)/Z.layerSeconds;function Vc(e){let t=Z.countGrowth**(e-1),n=Math.min(e,12),r=t=>Lc[(e*2+t)%Lc.length];return[Rc({offset:2,count:Math.round(380*t),over:2.6,hydralisks:4+(n>>2),banelings:12+n*2,roaches:8+n,aberrations:Math.min(8,2+(n>>1))},r(0)),Rc({offset:11,count:Math.round(420*t),over:2.8,hydralisks:6,banelings:14+n*2,roaches:10+n,aberrations:Math.min(8,2+(n>>1))},r(1)),Rc({offset:21,herald:`endless`,count:Math.round(500*t),over:1.5,lane:0,spread:6.4,banelings:40+n*4,roaches:14+n*2,aberrations:Math.min(10,3+n)},e%2?`swarm`:`armored`)]}function Hc(e){return Math.min(Z.supportCapMax,Z.supportCap+Math.floor(Math.max(0,e)/Z.supportEvery))}function Uc(e){let t=Math.max(0,e-Z.capGrowthFrom+1);return{marines:Math.min(Z.marineCapMax,Z.marineCap+t*Z.marinesPerLayer),tanks:Math.min(Z.tankCapMax,Z.tankCap+Math.floor(t/Z.tankEvery))}}var Wc=6.4,Gc={orbital:{cooldown:18,first:6,lead:.5,spacing:.18,strikes:5,radius:2.5,damage:80,bossDamage:150,armored:2,samples:36,minZ:-13,maxZ:6},lance:{cooldown:25,first:15,lead:.3,sweep:.8,halfWidth:1.4,damage:110,bossDamage:250,autoFromZ:7,autoToZ:-15,aimSlow:.25,aimTimeout:2},bombardment:{cooldown:75,first:45,duration:10,shots:250,radius:1.3,maxTargets:5,damage:24,bossDamage:12,armored:2,aimed:.6,minZ:-14}},Kc=e=>({kind:`spear`,unitId:-1,weapon:e,presentationDelay:0}),qc=(e,t)=>e.attributes?.includes(`armored`)?t:1;function Jc(e,t,n){let r=e.enemies.filter(e=>!e.dead&&e.z>t.minZ&&e.z<t.maxZ);if(!r.length)return e.boss&&!e.boss.dead&&e.boss.z>t.minZ?{x:e.boss.x,z:e.boss.z}:null;let i=t.radius,a=new Map,o=(e,t)=>e*4096+t;for(let e of r){let t=o(Math.floor(e.x/i),Math.floor(e.z/i));a.set(t,(a.get(t)??0)+1)}let s=e=>{let t=Math.floor(e.x/i),n=Math.floor(e.z/i),r=0;for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++)r+=a.get(o(t+e,n+i))??0;return r},c=null,l=-1;for(let i=0;i<t.samples;i++){let i=r[Math.floor(e.random()*r.length)];if(n.some(e=>Math.hypot(e.x-i.x,e.z-i.z)<t.radius*1.5))continue;let a=s(i);a>l&&(c={x:i.x,z:i.z},l=a)}return c}function Yc(e,{quiet:t=!1,...n}={}){let r=e.battle,i={...Gc.orbital,...n},a=[];for(let t=0;t<i.strikes;t++){let n=Jc(r,i,a);if(!n)break;a.push(n),e.strikes.push({at:r.time+i.lead+t*i.spacing,x:n.x,z:n.z,kind:`orbital`,radius:i.radius})}r.events.push({type:`orbitalCall`,spots:a,lead:i.lead,spacing:i.spacing,radius:i.radius,quiet:t})}function Xc(e,t=null){let n=e.battle,r=Gc.lance,i=e=>Math.max(-6.4,Math.min(Wc,e)),a=t?{x0:i(t.x0),z0:Math.min(N,t.z0),x1:i(t.x1),z1:Math.min(N,t.z1)}:{x0:n.x,z0:r.autoFromZ,x1:n.x,z1:r.autoToZ};e.lance={...a,start:n.time+r.lead,hit:new Set,aimed:!!t},n.events.push({type:`lanceCall`,...a,lead:r.lead,sweep:r.sweep,halfWidth:r.halfWidth})}function Zc(e,{quiet:t=!1}={}){let n=e.battle;e.bombardment={start:n.time,fired:0},n.events.push({type:`bombardmentStart`,duration:Gc.bombardment.duration,quiet:t})}function Qc(e,t){let n=e.battle,r={...Gc.orbital,radius:t.radius??Gc.orbital.radius},i=n.powerScale;for(let e of n.splashTargets(t.x,t.z,r.radius,1/0))n.damageEnemy(e,r.damage*i*qc(e,r.armored),!0,Kc(`orbital`));n.boss&&!n.boss.dead&&Math.hypot(n.boss.x-t.x,n.boss.z-t.z)<r.radius+2.5&&n.damageBoss(r.bossDamage*i,Kc(`orbital`)),n.events.push({type:`orbitalStrike`,x:t.x,z:t.z,radius:r.radius})}function $c(e){let t=e.battle,n=Gc.lance,r=e.lance,i=t.powerScale,a=Math.min(1,(t.time-r.start)/n.sweep);if(a<0)return;let o=r.x0+(r.x1-r.x0)*a,s=r.z0+(r.z1-r.z0)*a,c=o-r.x0,l=s-r.z0,u=c*c+l*l||1e-6,d=(e,t,n)=>{let i=Math.max(0,Math.min(1,((e-r.x0)*c+(t-r.z0)*l)/u));return Math.hypot(e-(r.x0+c*i),t-(r.z0+l*i))<n};for(let e of t.enemies)e.dead||r.hit.has(e)||!d(e.x,e.z,n.halfWidth)||(r.hit.add(e),t.damageEnemy(e,n.damage*i,!0,Kc(`lance`)));t.boss&&!t.boss.dead&&!r.hit.has(t.boss)&&d(t.boss.x,t.boss.z,n.halfWidth+2.5)&&(r.hit.add(t.boss),t.damageBoss(n.bossDamage*i,Kc(`lance`))),a>=1&&(t.events.push({type:`lanceEnd`,hits:r.hit.size}),e.lance=null)}function el(e){let t=e.battle,n=Gc.bombardment,r=e.bombardment,i=t.powerScale,a=Math.min(n.shots,Math.floor((t.time-r.start)/n.duration*n.shots)),o=r.fired<a?t.enemies.filter(e=>!e.dead&&e.z>n.minZ&&e.z<17.2):[];for(;r.fired<a;r.fired++){let e,r;if(o.length&&t.random()<n.aimed){let n=o[Math.floor(t.random()*o.length)];e=n.x+(t.random()-.5),r=n.z+(t.random()-.5)}else e=(t.random()*2-1)*Wc,r=n.minZ+t.random()*(N-n.minZ);for(let a of t.splashTargets(e,r,n.radius,n.maxTargets))t.damageEnemy(a,n.damage*i*qc(a,n.armored),!0,Kc(`bombardment`));t.boss&&!t.boss.dead&&Math.hypot(t.boss.x-e,t.boss.z-r)<n.radius+2.5&&t.damageBoss(n.bossDamage*i,Kc(`bombardment`)),t.events.push({type:`bombardmentShot`,x:e,z:r})}t.time-r.start>=n.duration&&(e.bombardment=null,t.events.push({type:`bombardmentEnd`}))}function tl(e){let t=e.battle;if(e.strikes.length){let n=e.strikes.filter(e=>e.at<=t.time);n.length&&(e.strikes=e.strikes.filter(e=>e.at>t.time));for(let t of n)Qc(e,t)}e.lance&&$c(e),e.bombardment&&el(e)}var nl=6.4,rl=2.4,il={combatdrop:{cooldown:20,first:6,lead:.6,bots:4,spread:1.6,minZ:-10,maxZ:5,landRadius:2.4,landDamage:40,stun:1.5,life:15,reach:2.2,damage:9,bossDamage:12,cooldownHit:.5,speed:6,samples:30},spidermines:{cooldown:25,first:15,mines:10,trigger:1.3,radius:2.1,maxTargets:12,damage:70,bossDamage:90,life:20,autoZ:-2,aimSlow:.25,aimTimeout:2},beam:{cooldown:75,first:45,lead:.8,sweep:1.4,damage:120,bossDamage:500,halfWidth:.9,minZ:-15}},al=e=>({kind:`swann`,unitId:-1,weapon:e,presentationDelay:0});function ol(e,t){let n=e.enemies.filter(e=>!e.dead&&e.z>t.minZ&&e.z<t.maxZ);if(!n.length)return e.boss&&!e.boss.dead?{x:e.boss.x,z:e.boss.z}:{x:e.x,z:0};let r=n[0],i=-1;for(let a=0;a<t.samples;a++){let a=n[Math.floor(e.random()*n.length)],o=e.splashTargets(a.x,a.z,t.landRadius,1/0).length;o>i&&(r=a,i=o)}return{x:r.x,z:r.z}}function sl(e){let t=e.battle,n=il.combatdrop,r=ol(t,n),i=Array.from({length:n.bots},(e,i)=>{let a=i/n.bots*Math.PI*2+t.random();return{x:Math.max(-6.4,Math.min(nl,r.x+Math.cos(a)*n.spread)),z:r.z+Math.sin(a)*n.spread}});e.drops.push(...i.map(e=>({...e,landAt:t.time+n.lead}))),t.events.push({type:`combatDrop`,x:r.x,z:r.z,lead:n.lead,drops:i})}function cl(e,t=null){let n=e.battle,r=il.spidermines,i=e=>Math.max(-6.4,Math.min(nl,e)),a=t?{x0:i(t.x0),z0:Math.min(N-1,t.z0),x1:i(t.x1),z1:Math.min(N-1,t.z1)}:{x0:i(n.x-4.5),z0:r.autoZ,x1:i(n.x+4.5),z1:r.autoZ};for(let t=0;t<r.mines;t++){let i=r.mines>1?t/(r.mines-1):.5;e.mines.push({id:n.nextUnitId++,x:a.x0+(a.x1-a.x0)*i,z:a.z0+(a.z1-a.z0)*i,until:n.time+r.life})}n.events.push({type:`minesLaid`,...a,count:r.mines,aimed:!!t})}function ll(e){let t=e.battle,n=il.beam,r=t.x>=0;e.beam={start:t.time+n.lead,from:r?-7.4:7.4,to:r?7.4:-7.4,hit:new Set},t.events.push({type:`beamCall`,from:e.beam.from,to:e.beam.to,lead:n.lead,sweep:n.sweep,minZ:n.minZ})}function ul(e,t){let n=e.battle,r=il.spidermines,i=n.powerScale;for(let e of n.splashTargets(t.x,t.z,r.radius,r.maxTargets))n.damageEnemy(e,r.damage*i,!0,al(`mine`));n.boss&&!n.boss.dead&&Math.hypot(n.boss.x-t.x,n.boss.z-t.z)<r.radius+2.5&&n.damageBoss(r.bossDamage*i,al(`mine`)),n.events.push({type:`mineBurst`,x:t.x,z:t.z,radius:r.radius,id:t.id})}function dl(e,t){let n=e.battle,r=n.powerScale;if(e.drops.length){let t=il.combatdrop;e.drops=e.drops.filter(i=>{if(n.time<i.landAt)return!0;for(let e of n.splashTargets(i.x,i.z,t.landRadius,1/0))n.damageEnemy(e,t.landDamage*r,!0,al(`drop`)),e.dead||(e.frozen=Math.max(e.frozen??0,t.stun));return e.bots.push({id:n.nextUnitId++,kind:`ares`,x:i.x,z:i.z,until:n.time+t.life,cooldown:.3,yaw:0,target:null,arrival:0,attackAnimation:0,attackDuration:.4}),n.events.push({type:`botLand`,x:i.x,z:i.z,radius:t.landRadius}),!1})}if(e.bots.length){let i=il.combatdrop;e.bots=e.bots.filter(e=>{if(n.time>=e.until)return n.events.push({type:`botGone`,x:e.x,z:e.z,id:e.id}),!1;if(e.z+=rl*t*.5,e.attackAnimation=Math.max(0,e.attackAnimation-t),!e.target||e.target.dead){e.target=null;let t=1/0;for(let r of n.nearbyEnemies(e.x,e.z,6)){let n=Math.hypot(r.x-e.x,r.z-e.z);!r.dead&&n<t&&(e.target=r,t=n)}!e.target&&n.boss&&!n.boss.dead&&Math.hypot(n.boss.x-e.x,n.boss.z-e.z)<8&&(e.target=n.boss)}let a=e.target;if(!a)return!0;let o=a.x-e.x,s=a.z-e.z,c=Math.hypot(o,s)||1,l=i.reach+(a===n.boss?2.5:0);if(e.yaw=Math.atan2(-o,-s),c>l){let n=Math.min(c-l*.8,i.speed*t);return e.x+=o/c*n,e.z+=s/c*n,!0}return(e.cooldown-=t)>0||(e.cooldown=i.cooldownHit,e.attackAnimation=e.attackDuration,n.events.push({type:`botHit`,x:e.x,z:e.z,tx:a.x,tz:a.z,id:e.id}),a===n.boss?n.damageBoss(i.bossDamage*r,al(`bot`)):n.damageEnemy(a,i.damage*r,!0,al(`bot`)),!0)})}if(e.mines.length){let r=il.spidermines;e.mines=e.mines.filter(i=>(i.z+=rl*t,!(n.nearbyEnemies(i.x,i.z,r.trigger).some(e=>!e.dead&&Math.hypot(e.x-i.x,e.z-i.z)<r.trigger)||n.boss&&!n.boss.dead&&Math.hypot(n.boss.x-i.x,n.boss.z-i.z)<r.trigger+2.5)&&n.time<i.until&&i.z<17.2||(ul(e,i),!1)))}if(e.beam){let t=il.beam,i=e.beam,a=(n.time-i.start)/t.sweep;if(a>=0){let o=i.from+(i.to-i.from)*Math.min(1,a),s=Math.min(i.lastX??o,o)-t.halfWidth,c=Math.max(i.lastX??o,o)+t.halfWidth;i.lastX=o;for(let e of n.enemies)e.dead||i.hit.has(e)||e.z<t.minZ||e.z>17.2||e.x<s||e.x>c||(i.hit.add(e),n.damageEnemy(e,t.damage*r,!0,al(`beam`)));n.boss&&!n.boss.dead&&!i.hit.has(n.boss)&&n.boss.x+2.5>s&&n.boss.x-2.5<c&&(i.hit.add(n.boss),n.damageBoss(t.bossDamage*r,al(`beam`))),a>=1&&(n.events.push({type:`beamEnd`,hits:i.hit.size}),e.beam=null)}}}var fl={rally:{cooldown:20,first:6,duration:6,damage:.3,rate:.4,bio:{damage:.5,rate:.6}},banshee:{cooldown:25,stackCooldown:40,stack:3,first:15,callout:.85,lead:.55,sweep:.9,fromZ:7.5,length:22,halfWidth:2.3,bombs:11,radius:2.1,damage:75,bossDamage:180},drop:{cooldown:45,stackCooldown:60,stack:4,first:20,fall:.8,ahead:3.2,weights:{main:30,front:55,heavy:8,artillery:7},odin:.02},hyperion:{cooldown:75,first:45,arrive:1.1,stay:8,leave:1.3,laserEvery:.1,volley:3,laserDamage:20,laserBoss:14,laserRadius:1.4,laserCap:6,reachZ:-15,halfWidth:6.8,yamatoAt:1.6,yamatoCharge:1.2,yamatoDamage:950,yamatoBoss:1300},...Gc,...il},pl=Object.fromEntries(Object.entries(Eo).map(([e,t])=>[e,t.powers]));function ml(e,t){let n=e.powers?.rallyUntil??-1/0;return e.time<n?1+fl.rally[t]:1}var hl=[`raynor`,`marine`,`firebat`];function gl(e,t,n){return!(e.time<(e.powers?.rallyUntil??-1/0))||!hl.includes(t.kind)?1:(1+fl.rally.bio[n])/(1+fl.rally[n])}var _l=(e,t)=>({kind:e,unitId:-1,weapon:t,presentationDelay:0}),vl=class{constructor(e,t){this.battle=e,this.ids=pl[t]??[],this.readyAt=Object.fromEntries(this.ids.map(t=>[t,e.time+fl[t].first])),this.wait=Object.fromEntries(this.ids.map(e=>[e,fl[e].first])),this.announced=new Set,this.bombs=[],this.hyperion=null,this.rallyUntil=-1/0,this.strikes=[],this.lance=null,this.bombardment=null,this.drops=[],this.bots=[],this.mines=[],this.beam=null,this.supportDrop=null,this.supportDrops=0,this.dropQueue=0,this.stored=Object.fromEntries(this.ids.filter(e=>fl[e].stack).map(e=>[e,0]))}cooldown(e,t=!1){return(t?fl[e].stackCooldown:fl[e].cooldown)*(1-Fn*(this.battle.general?.logistics??0))}charge(e){if(this.stored[e])return 1;let t=this.readyAt[e]-this.battle.time;return t<=0?1:Math.max(0,1-t/this.wait[e])}remaining(e){return this.stored[e]?0:Math.max(0,this.readyAt[e]-this.battle.time)}ready(e){return this.ids.includes(e)&&(e in this.stored?this.stored[e]>0:this.remaining(e)<=0)&&!(e===`hyperion`&&this.hyperion)&&!(e===`bombardment`&&this.bombardment)&&!(e===`lance`&&this.lance)&&!(e===`beam`&&this.beam)}use(e,t=null){let n=this.battle;if(n.state!==`playing`||!this.ready(e))return!1;if(e in this.stored?this.spend(e):(this.wait[e]=this.cooldown(e),this.readyAt[e]=n.time+this.wait[e],this.announced.delete(e)),e===`rally`)this.rally();else if(e===`banshee`)this.airstrike();else if(e===`hyperion`)this.callHyperion();else if(e===`drop`)this.callDrop();else if(e===`orbital`)Yc(this);else if(e===`lance`)Xc(this,t);else if(e===`bombardment`)Zc(this);else if(e===`combatdrop`)sl(this);else if(e===`spidermines`)cl(this,t);else if(e===`beam`)ll(this);else throw Error(`Unknown commander power: ${e}`);return!0}restock(e){let t=fl[e],n=this.battle;for(;this.stored[e]<t.stack&&this.readyAt[e]<=n.time;)this.stored[e]++,this.stored[e]<t.stack?(this.wait[e]=this.cooldown(e,!0),this.readyAt[e]+=this.wait[e]):this.readyAt[e]=1/0}spend(e){let t=this.battle,n=this.stored[e]===fl[e].stack;if(this.stored[e]--,n)this.wait[e]=this.cooldown(e,this.stored[e]>0),this.readyAt[e]=t.time+this.wait[e];else if(!this.stored[e]){let n=1-this.remaining(e)/this.wait[e];this.wait[e]=this.cooldown(e),this.readyAt[e]=t.time+(1-n)*this.wait[e]}this.stored[e]||this.announced.delete(e)}rally(){let e=this.battle,t=fl.rally;this.rallyUntil=e.time+t.duration;let n=_t(e);e.events.push({type:`commanderRally`,duration:t.duration,squad:n})}airstrike(){let e=this.battle,t=fl.banshee,n=e.x,r=t.fromZ-t.length;for(let r=0;r<t.bombs;r++){let i=r/(t.bombs-1);this.bombs.push({at:e.time+t.callout+t.lead+i*t.sweep,x:n+(r%2?1:-1)*t.halfWidth*.45+(e.random()-.5)*.6,z:t.fromZ-i*t.length})}e.events.push({type:`bansheeStrike`,x:n,fromZ:t.fromZ,toZ:r,callout:t.callout,lead:t.lead,sweep:t.sweep})}callHyperion(){let e=this.battle,t=fl.hyperion;this.hyperion={x:e.x,start:e.time,laserAt:e.time+t.arrive,yamatoDelay:t.yamatoAt,yamato:null,fired:!1},e.events.push({type:`hyperionArrive`,x:e.x,arrive:t.arrive,stay:t.stay,leave:t.leave})}callDrop(){let e=this.battle,t=fl.drop;if(this.supportDrop){this.dropQueue++;return}let n=e.dropOption(t.weights,t.odin);this.supportDrop={id:-++this.supportDrops,x:e.x,z:e.frontZ-t.ahead,fall:t.fall,state:`falling`,option:n},e.events.push({type:`dropCall`,id:this.supportDrop.id,x:this.supportDrop.x,z:this.supportDrop.z,fall:t.fall,text:n.label,portrait:n.portrait,rarity:n.rarity})}update(e){let t=this.battle;if(this.supportDrop&&(this.supportDrop.fall-=e)<=0){let e=this.supportDrop;this.supportDrop=null,t.landDrop(e),this.dropQueue&&(this.dropQueue--,this.callDrop())}for(let e in this.stored)this.restock(e);for(let e of this.ids)this.ready(e)&&!this.announced.has(e)&&(this.announced.add(e),t.events.push({type:`powerReady`,power:e}));if(this.bombs.length){let e=this.bombs.filter(e=>e.at<=t.time);e.length&&(this.bombs=this.bombs.filter(e=>e.at>t.time));for(let t of e)this.bomb(t)}this.hyperion&&this.updateHyperion(e),tl(this),dl(this,e)}bomb({x:e,z:t}){let n=this.battle,r=fl.banshee,i=n.airSupportScale;for(let a of n.splashTargets(e,t,r.radius,1/0))n.damageEnemy(a,r.damage*i,!0,_l(`banshee`,`rocket`));n.boss&&!n.boss.dead&&Math.hypot(n.boss.x-e,n.boss.z-t)<r.radius+2.5&&n.damageBoss(r.bossDamage*i,_l(`banshee`,`rocket`)),n.events.push({type:`bansheeBomb`,x:e,z:t})}updateHyperion(e){let t=this.battle,n=fl.hyperion,r=this.hyperion,i=t.time-r.start;r.x+=(t.x-r.x)*(1-Math.exp(-e*2.5));let a=n.arrive+n.stay;if(i>=a+n.leave){this.hyperion=null;return}if(i>=a){r.leaving||(r.leaving=!0,t.events.push({type:`hyperionLeave`,x:r.x}));return}if(i<n.arrive)return;let o=t.airSupportScale;for(;t.time>=r.laserAt&&r.laserAt<r.start+a;){r.laserAt+=n.laserEvery;for(let e=0;e<n.volley;e++){let e=this.laserTarget(r.x);if(!e)break;e===t.boss&&t.damageBoss(n.laserBoss*o,_l(`hyperion`,`laser`));for(let r of n.laserRadius?t.splashTargets(e.x,e.z,n.laserRadius,n.laserCap):e===t.boss?[]:[e])t.damageEnemy(r,n.laserDamage*o,!1,_l(`hyperion`,`laser`));t.events.push({type:`hyperionLaser`,x:r.x,tx:e.x,tz:e.z,radius:n.laserRadius})}}if(!r.yamato&&i>=n.arrive+r.yamatoDelay){let e=this.yamatoTarget(r.x);e?(r.yamato={target:e,at:t.time+n.yamatoCharge},t.events.push({type:`yamatoCharge`,x:r.x,tx:e.x,tz:e.z,charge:n.yamatoCharge})):r.yamatoDelay+=.5}if(r.yamato&&!r.fired&&t.time>=r.yamato.at){r.fired=!0;let e=r.yamato.target,i=e.dead?this.yamatoTarget(r.x):e;i===t.boss?t.damageBoss(n.yamatoBoss*o,_l(`hyperion`,`yamato`)):i&&t.damageEnemy(i,n.yamatoDamage*o,!0,_l(`hyperion`,`yamato`));let a=i??e;t.events.push({type:`yamatoFire`,x:r.x,tx:a.x,tz:a.z})}}inReach(e,t){return!e.dead&&e.z>fl.hyperion.reachZ&&e.z<17.2&&Math.abs(e.x-t)<fl.hyperion.halfWidth}laserTarget(e){let t=this.battle,n=t.enemies;if(t.boss&&!t.boss.dead&&this.inReach(t.boss,e)&&t.random()<.15)return t.boss;let r=null;for(let i=0;i<10&&n.length;i++){let i=n[Math.floor(t.random()*n.length)];this.inReach(i,e)&&(!r||i.z>r.z)&&(r=i)}return r}yamatoTarget(e){let t=this.battle;if(t.boss&&!t.boss.dead&&this.inReach(t.boss,e))return t.boss;let n=null;for(let r of t.enemies)this.inReach(r,e)&&(!n||r.maxHp>n.maxHp||r.maxHp===n.maxHp&&r.z>n.z)&&(n=r);return n}},yl={layer:16,delay:1.5,commsAfter:1.6,brief:2.2,units:[`tempest`,`carrier`,`reaver`],warp:2,supports:[`carrier`,`tempest`],artillery:[`reaver`],weight:.5},bl={layer:10,delay:1.5,pickAfter:2.4,units:[`immortal`,`colossus`,`templar`],warp:2,orbital:{strikes:12,spacing:.12,radius:3.2,quiet:!0}},xl=e=>e.alliance&&e.commander!==`artanis`&&bl.units.every(t=>e.baseRoster.supports.includes(t)),Sl=[`artanis`,`zealot`,`dragoon`,`templar`,`darktemplar`,`archon`,`immortal`,`colossus`,`reaver`,`phoenix`,`carrier`,`tempest`],Cl=e=>e.alliance&&!e.baseRoster.supports.some(e=>yl.units.includes(e))&&e.baseRoster.artilleryKind!==`reaver`,wl=new WeakMap;function Tl(e){return wl.has(e)||wl.set(e,{...e,supports:[...e.supports,...yl.supports],artilleries:[e.artilleryKind,...yl.artillery]}),wl.get(e)}function El(e,t,n){t.layer===yl.layer&&!e.daelaam&&Cl(e)&&t.queue.push({at:e.time+yl.delay*n,daelaam:!0})}function Dl(e,t,n){t.layer===bl.layer&&!e.vanguard&&xl(e)&&t.queue.push({at:e.time+bl.delay*n,vanguard:!0})}var Ol=3400,kl=3,Al={marines:1},jl=new Set([`flame`,`napalm`,`wildfire`,`lineflame`,`disintegration`,`graviton`,`lockon`,`drill`,`irradiate`]),Ml={hp:145,hpPerSecond:1.2,regen:.03,regenDelay:1.5},Nl={hp:340,hpPerSecond:2.5},Pl={early:4,mid:8,late:10,capstoneBonus:2,escortEarly:2,escortLate:4,frontShare:.5},Fl={terran:{main:`marines`,mainKind:`marine`,reinforce:`reinforce`,front:`firebat`,frontKind:`firebat`,artillery:`tank`,artilleryKind:`tank`,supports:tc,plan:[`marines`,`tank`,`marines`,`firebat`,`marines`,`thor`,`colossus`,`immortal`,`marines`,`reinforce`],contracts:`terran`},protoss:{main:`dragoons`,mainKind:`dragoon`,reinforce:`dragoonWarp`,front:`zealots`,frontKind:`zealot`,artillery:`reaver`,artilleryKind:`reaver`,supports:[`immortal`,`colossus`,`templar`,`carrier`,`tempest`,`darktemplar`,`phoenix`],plan:[`dragoons`,`reaver`,`dragoons`,`zealots`,`dragoons`,`carrier`,`colossus`,`immortal`,`dragoons`,`dragoonWarp`],contracts:`protoss`,archon:!0},mech:{main:`hellions`,mainKind:`hellion`,reinforce:`hellionDrop`,front:`hellbats`,frontKind:`hellbat`,artillery:`tank`,artilleryKind:`tank`,supports:[`thor`,`goliath`,`cyclone`,`sciencevessel`],plan:[`hellions`,`tank`,`hellions`,`hellbats`,`hellions`,`thor`,`goliath`,`cyclone`,`hellions`,`hellionDrop`],contracts:`mech`,escortText:`option.tank.escortHellion`}},Il=1.3,Ll=1.5,Rl={after:2.5,hold:5},zl={hp:1e3,z:N,leak:{zergling:1,hydralisk:6,baneling:4,roach:8,aberration:12}},Bl={from:1.5,rate:1.8,clamp:.8},Vl={zergling:8,zerglingSpread:1.2,hydralisk:5.5,baneling:10.4,roach:4.4,aberration:3},Hl={scale:1.6,variance:.28},Ul=[{start:0,scale:.74},{start:24,scale:.92},{start:46,scale:1},{start:62,scale:1.12},{start:75,scale:1.24}];function Wl(e){let t=Ul[0].scale;for(let n of Ul)e>=n.start&&(t=n.scale);return t}var Gl=5,Kl={ahead:1.6,height:1.3},ql=.12,Jl=2,Yl=.6,Xl=1.8,Zl=4.3,Ql=6.4,Q={columns:12,minColumns:3,slot:.94,firebatSlot:1.85,rowPitch:.92,frontZ:8.1,arc:3.1,tankGap:1.8,minTankZ:12,supportGap:1.3,minSupportZ:11.8,colossusGap:2.6,minColossusZ:13.4,maxColossusZ:15.3,colossusPair:5.2,colossusRow:4.4,kindGap:.35,rearGap:.6,halfDeck:6.2,rearOrder:[`thor`,`junkerThor`,`sciencevessel`,`goliath`,`cyclone`,`carrier`,`goldenCarrier`,`tempest`,`siegebreaker`,`taldarimReaver`,`tank`,`reaver`,`immortal`,`templar`,`darktemplar`,`phoenix`],rearWidth:{thor:3,junkerThor:3.4,sciencevessel:2.6,goliath:2.4,cyclone:2.4,carrier:3.6,tempest:3.4,goldenCarrier:4.2,siegebreaker:3.7,taldarimReaver:3.2,tank:2.9,reaver:2.6,immortal:2.3,templar:1.7,darktemplar:1.6,phoenix:2.2},odinOffset:4,odinClear:4.4,odinReach:4.8,odinBehind:4.2,air:[`carrier`,`goldenCarrier`,`tempest`,`phoenix`,`sciencevessel`],airGap:1.2,splitBelow:.65,secondRow:2.6,flank:[`carrier`,`goldenCarrier`,`tempest`],flankX:5.6,flankZ:10.6,flankStep:3.2,sideKinds:[`thor`,`immortal`],sideHalf:{thor:1.8,immortal:1.2},sideStep:{thor:3,immortal:2.4},thorGap:.2,thorHalf:1.8,thorEdge:7.3,thorColumns:11,sideBack:1.8,rearLimit:14.5,maxAdvance:3.5};Q.columns;var $l={raynor:{weapon:`rifle`,slot:Q.slot,rank:2,supply:1,depth:Q.rowPitch,columns:1},marine:{weapon:`rifle`,slot:Q.slot,rank:2,supply:1,depth:Q.rowPitch,columns:1},firebat:{weapon:`flame`,slot:Q.firebatSlot,rank:1,supply:1,depth:Q.rowPitch,columns:1},artanis:{weapon:`blade`,slot:1.4,rank:2,supply:1,depth:1.35,columns:1.5},dragoon:{weapon:`plasma`,slot:1.5,rank:2,supply:2,depth:1.6,columns:1.6},zealot:{weapon:`blade`,slot:1.25,rank:1,supply:1,depth:1.15,columns:1.33},hellion:{weapon:`lineflame`,slot:1.35,rank:2,supply:2,depth:1.5,columns:1.45},hellbat:{weapon:`flame`,slot:1.6,rank:1,supply:2,depth:1.35,columns:1.6},archon:{weapon:`psionic`,slot:1.9,rank:1,supply:0,depth:1.9,columns:2}},eu=e=>{let t=$l[e.kind];if(!t)throw Error(`Unknown infantry kind: ${e.kind}`);return t},tu=e=>eu(e).weapon===`flame`,nu=e=>eu(e).weapon===`rifle`,ru=e=>[`flame`,`blade`,`psionic`].includes(eu(e).weapon),iu=e=>e.hero?0:e.merc?Math.min(1.5,eu(e).rank):eu(e).rank,au=10.7,ou=8.4;Q.arc;var su=2.4,cu=(e,t,n)=>Math.max(t,Math.min(n,e)),lu=V;function uu(e){let t=e>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}var du=class{constructor(e=2026){this.reset(e)}reset(e=2026,t=[]){for(let e of t)if(!jc[e])throw Error(`Unknown mutator: ${e}`);this.mutators=[...t],this.revivals=[],this.revived=0,this.reviving=null,this.mutatorStart=1/0,this.commander=null,this.endless=null,this.powers=null,this.pet=null,this.petRoar=null,this.random=uu(e),this.randomDraft=!1,this.draftRandom=uu((e^1540483477)>>>0),this.supportOrder=null,this.interactiveLevelUps=!1,this.levelUpPreference=null,this.levelUp=null,this.pendingLevelUps=0,this.rerolls=1,this.lastGateAt=-1/0,this.levelHeldSince=null,this.sandbox=!1,this.sandboxTrickle=0,this.tampered=!1,this.contracts=!1,this.pod=null,this.nextPodId=1,this.mercenaryHistory=[],this.alliance=!1,this.daelaam=null,this.vanguard=null,this.daelaamBrief=!1;let n=uu((e^739982445)>>>0);this.contractGates=on.gates.map(e=>e[Math.floor(n()*e.length)]),this.time=0,this.state=`ready`,this.x=0,this.targetX=0,this.frontZ=Q.frontZ,this.frontAdvance=0,this.frontRifleZ=-1/0,this.kills=0,this.losses=0,this.escaped=0,this.line=zl.hp,this.leakDamage=0,this.marines=[],this.tanks=[],this.enemies=[],this.events=[],this.upgrades=[],this.supports=[],this.supportRounds=[],this.gate=null,this.boss=null,this.bossSpawned=!1,this.weaponLevel=1,this.piercing=0,this.armor=0,this.bounties=0,this.spawnDebt=0,this.nextEnemyId=1,this.nextUnitId=1,this.nextGate=0,this.peakEnemies=0,this.shotsFired=0,this.damageTaken=0,this.combo=0,this.comboTimer=0,this.bestCombo=0,this.killBuckets=Array(30).fill(0),this.killBucketTick=0,this.recentKills=0,this.peakKillRate=0,this.enemyGrid=new Yo,this.gridReady=!1,this.pickScratch=[],this.pierceScratch=[],this.overdrive=0,this.overdrives=0,this.researchLevel=0,this.xp=0,this.researchHistory=[],this.modules={},this.general={drill:0,logistics:0},this.focusKind=`marine`,this.burnZones=[],this.burnTick=0,this.secondaryBlasts=[],this.scarabs=[],this.wrecks=[],this.irradiated=[],this.drill=null,this.storms=[],this.scorchTrails=[],this.scorchTick=0,this.barrageShells=[],this.lostSupports=new Set,this.voidZones=[],this.voidTick=0,this.sunders=[],this.rifts=[],this.rimeZones=[],this.synergyHistory=[],this.announcedSynergies=new Set,this.formedSynergies=new Set,this.heroic=new Set,this.nameRandom=uu((e^461845907)>>>0),this.usedNames=new Set,this.squadNames={},this.growthHistory=[],this.equipmentTriggers={salvo:0,shrapnel:0,napalm:0,cluster:0,barrage:0,resonance:0,resweep:0,stim:0,twinstorm:0,volleyfire:0,wildfire:0,aftershock:0,bombardment:0,odinBarrage:0,crossburn:0,lightning:0},this.stimTimer=sr.stim.every,this.stimUntil=-1,this.volleyTimer=Ln.every,this.volleyRounds=0,this.volleyLeft=0,this.volleyNext=0,this.wildfireStep=0,this.volleySurgeUntil=-1,this.rush=null,this.nextRush=Go.first,this.rushIndex=0,this.nextWave=0,this.activeWaves=[],this.lastLane=0,this.announced=new Set,this.offeredOrdnance=[],this.nextHerald=0,this.heraldUntil=0,this.spawnedBanelings=0,this.spawnedRoaches=0,this.spawnedAberrations=0,this.spines=[],this.spinesFired=0,this.spawnedHydralisks=0,this.report=new ct,this.addMarines(Al.marines)}mutated(e){return this.time>=this.mutatorStart&&this.mutators.includes(e)}get enemySpeedScale(){return this.mutated(`speedFreaks`)?jc.speedFreaks.speed:1}mutate(e){if(this.mutated(`barrier`)&&(e.barrier=`ready`),this.mutated(`justDie`)&&(e.revives=+(!this.reviving&&(e.id*2654435761>>>0)/4294967296<jc.justDie.chance)),this.endless){let t=Pc(this.endless.layer,e.kind);this.random()<Fc(this.endless.layer,e.kind)&&!this.reviving&&(e.elite=!0,t*=Z.elite.kindHp[e.kind]??Z.elite.hp,e.scale=(e.scale??1)*Z.elite.scale),e.hp*=t,e.maxHp=e.hp}return e}get allies(){return[...this.marines,...this.tanks,...this.supports]}get squadCount(){return this.marines.reduce((e,t)=>e+(t.merc?0:eu(t).supply),0)}get tankCount(){return this.tanks.reduce((e,t)=>e+ +!t.merc,0)}get regularSupports(){return this.supports.filter(e=>!e.merc&&!e.vanguard)}ownsSupport(e){return this.supports.some(t=>t.kind===e&&!t.merc&&t.hp>0)}get supportCap(){return this.endless?Hc(this.endless.layer):3}get supportKindCap(){return Math.ceil(this.supportCap/this.roster.supports.length)}supportKindFull(e){return this.supports.filter(t=>t.kind===e&&!t.merc&&!t.vanguard&&t.hp>0).length>=this.kindCap(e)}kindCap(e){return e===`thor`&&this.endless?Math.min(Z.thorCap,this.supportKindCap*2):this.supportKindCap}get growthTime(){return Mo(this.endless?Math.min(this.time,No):this.time)}get marineCap(){return this.endless?Uc(this.endless.layer).marines:60}get tankCap(){return this.endless?Uc(this.endless.layer).tanks:4}enemyArmor(e){return(e.sunderedUntil??-1)>this.time?0:(oe[e.kind]??0)+(this.endless?Z.armorPerLayer*Math.max(0,this.endless.layer-1)+ +!!e.elite:0)}get enemyDamageScale(){return this.endless?Z.damageGrowth**Math.max(0,this.endless.layer-1):1}get pierceReach(){return q.marine.pierceReach+n.pierceReach*Math.max(0,this.piercing-1)}get rateScale(){return(1+Z.boost.rate*(this.endless?.rateBoost??0))*ml(this,`rate`)*Je(this,`rate`)}addSupport(e,{force:t=!1,grant:n=!1}={}){if(!tc.includes(e)&&!this.roster.supports.includes(e))throw Error(`Unknown support unit: ${e}`);if(t&&(this.tampered=!0),!t&&!n&&(this.regularSupports.length>=this.supportCap||this.supportKindFull(e)))return;let r=lu[e]+this.armor;this.supports.push(ms(this,{id:this.nextUnitId++,kind:e,hp:r,maxHp:r,x:this.x,z:15,cooldown:.05,recoil:0,yaw:0,arrival:1,hit:0,attackAnimation:0})),this.lostSupports.delete(e),this.heroic.has(e)&&this.nameHeroes(e),this.report.deploy(e)}get baseRoster(){return Fl[Eo[this.commander]?.roster??`terran`]}get roster(){return this.daelaam&&![`bombard`,`comms`,`brief`].includes(this.daelaam.stage)?Tl(this.baseRoster):this.baseRoster}isArtillery(e){return e===this.roster.artilleryKind||!!this.roster.artilleries?.includes(e)}heavyWeights(e){return Object.fromEntries(this.roster.supports.map(t=>[t,this.lostSupports.has(t)?Xl:e]))}get lineRatio(){return Math.max(0,this.line/zl.hp)}get health(){let e=this.allies;return e.length?e.reduce((e,t)=>e+t.hp/t.maxHp,0)/e.length*100:0}start(){if(this.state!==`ready`)return;this.state=`playing`;let e=Eo[this.commander]?.hero,t=Eo[this.commander]?.opening;if(e||t){for(let e of this.marines)this.report.undeploy(e.kind);this.marines=[]}e?(this.addMarines(1,e),this.marines[0].hero=!0):t&&this.addMarines(1,t),this.powers=new vl(this,this.commander),this.overdrive=4,this.overdrives=1}pause(){this.state===`playing`&&(this.state=`paused`)}resume(){this.state===`paused`&&(this.state=`playing`)}setTarget(e){Number.isFinite(e)&&(this.targetX=cu(e,-4.3,Zl))}addMarines(e,t=`marine`){for(let r=0;r<e&&this.squadCount+($l[t]?.supply??1)<=this.marineCap;r++){let e=lu[t]+this.armor+(t===`firebat`?n.platingHp*(this.modules.plating??0):0);this.report.deploy(t),this.marines.push(ms(this,{id:this.nextUnitId++,kind:t,hp:e,maxHp:e,x:this.x,z:11,yaw:0,cooldown:this.random()*.18,phase:this.random()*6.28,recoil:0,hit:0,arrival:1,attackAnimation:0,attackDuration:.3}))}this.marines.sort((e,t)=>iu(e)-iu(t))}addArchon(e,t){let n=lu.archon+this.armor;this.report.deploy(`archon`),this.marines.push(ms(this,{id:this.nextUnitId++,kind:`archon`,hp:n,maxHp:n,x:e,z:t,yaw:0,cooldown:.4,phase:this.random()*6.28,recoil:0,hit:0,arrival:.4,attackAnimation:0,attackDuration:.4})),this.marines.sort((e,t)=>iu(e)-iu(t))}addTank(e=`tank`,{grant:t=!1}={}){if(!t&&this.tankCount>=this.tankCap)return;let n=lu[e]+this.armor;this.report.deploy(e),this.tanks.push(ms(this,{id:this.nextUnitId++,kind:e,hp:n,maxHp:n,x:this.x,z:15,cooldown:.05,recoil:0,yaw:0,arrival:1,hit:0})),this.heroic.has(`tank`)&&this.nameHeroes(`tank`)}spawnEnemy(e,t){if(this.enemies.length>=3400)return;let n=this.nextEnemyId++,r=t??(n*11%29-14)*.46,i=1.8+this.growthTime*.022,a=(Vl.zergling+this.random()*Vl.zerglingSpread)*Wl(this.growthTime)*this.enemySpeedScale;this.enemies.push(this.mutate({id:n,kind:`zergling`,x:r,homeX:r,z:e??-21-this.random()*3,hp:i,maxHp:i,speed:a,gait:a/Vl.zergling*Hl.scale*(1-Hl.variance/2+this.random()*Hl.variance),scale:.7+this.random()*.18,attributes:Le.zergling,big:!1,phase:this.random()*6.28,hit:0,dead:!1}))}spawnHydralisk(e,t){if(this.enemies.length>=3400||this.enemies.filter(e=>e.kind===`hydralisk`&&!e.dead).length>=28)return;let n=26+this.growthTime*.15;t=cu(t,-6.4,Ql),this.enemies.push(this.mutate({id:this.nextEnemyId++,kind:`hydralisk`,x:t,homeX:t,z:e,hp:n,maxHp:n,speed:Vl.hydralisk*this.enemySpeedScale,scale:1,attributes:Le.hydralisk,big:!0,phase:this.random()*6.28,hit:0,dead:!1,cooldown:.7+this.random()*1.1,attackAnimation:0})),this.reviving||this.spawnedHydralisks++}spawnBaneling(e,t){if(this.enemies.length>=3400||this.enemies.filter(e=>e.kind===`baneling`&&!e.dead).length>=110)return;let n=7+this.growthTime*.06;t=cu(t,-6.4,Ql),this.enemies.push(this.mutate({id:this.nextEnemyId++,kind:`baneling`,x:t,homeX:t,z:e,hp:n,maxHp:n,speed:Vl.baneling*this.enemySpeedScale,scale:1,attributes:Le.baneling,big:!1,phase:this.random()*6.28,hit:0,dead:!1})),this.reviving||this.spawnedBanelings++}spawnRoach(e,t){if(this.enemies.length>=3400||this.enemies.filter(e=>e.kind===`roach`&&!e.dead).length>=110)return;let n=Ml.hp+this.growthTime*Ml.hpPerSecond;t=cu(t,-6.4,Ql),this.enemies.push(this.mutate({id:this.nextEnemyId++,kind:`roach`,x:t,homeX:t,z:e,hp:n,maxHp:n,speed:Vl.roach*this.enemySpeedScale,scale:1,attributes:Le.roach,big:!0,phase:this.random()*6.28,hit:0,dead:!1,cooldown:.6+this.random()*.6,attackAnimation:0})),this.reviving||this.spawnedRoaches++}spawnAberration(e,t){if(this.enemies.length>=3400||this.enemies.filter(e=>e.kind===`aberration`&&!e.dead).length>=20)return;let n=Nl.hp+this.growthTime*Nl.hpPerSecond;t=cu(t,-6.4,Ql),this.enemies.push(this.mutate({id:this.nextEnemyId++,kind:`aberration`,x:t,homeX:t,z:e,hp:n,maxHp:n,speed:Vl.aberration*this.enemySpeedScale,scale:1,attributes:Le.aberration,big:!0,phase:this.random()*6.28,hit:0,dead:!1,cooldown:.4,attackAnimation:0})),this.reviving||this.spawnedAberrations++}preview(){let e=this.roster;if(e===Fl.terran)this.addMarines(11-this.marines.length),this.addMarines(4,`firebat`),this.addTank(),this.addSupport(`thor`),this.addSupport(`immortal`);else{this.marines=[];let t=Eo[this.commander]?.hero;t&&(this.addMarines(1,t),this.marines[0].hero=!0),this.addMarines(6,e.mainKind),this.addMarines(4,e.frontKind),this.addTank(e.artilleryKind),this.addSupport(e.supports[0]),this.addSupport(e.supports.at(-1))}for(let e=0;e<290;e++)this.spawnEnemy(1.4-Math.floor(e/23)*.95-this.random()*.5);for(let e=0;e<6;e++)this.spawnHydralisk(.9-e*.55,2.4+(e-2.5)*2.9);for(let e=0;e<5;e++)this.spawnRoach(1.9-e*.7,6.4+(e-2)*1.7);for(let e=0;e<3;e++)this.spawnAberration(-1.6-e*1.1,7.4+(e-1)*2.6);for(let e=0;e<7;e++)this.spawnBaneling(3.4-e%4,(e-3)*2);this.boss={x:-3.1,z:.7,hp:4400,maxHp:4400,hit:0,dead:!1,phase:0,attack:1.3},this.updateFormation(.2)}updateFormation(e){this.x+=(this.targetX-this.x)*(1-Math.exp(-e*22));let t=this.marines.reduce((e,t)=>e+eu(t).columns,0),n=Q.sideKinds.flatMap(e=>this.supports.filter(t=>t.kind===e&&t.skin!==`odin`)),r=cu(Math.round(Math.sqrt(t*1.9)),Q.minColumns,Math.min(this.formationColumns??Q.columns,n.length?Q.thorColumns:1/0)),i=n.length?Q.thorEdge-Q.thorHalf-Q.thorGap:Q.halfDeck,a=this.marines.reduce((e,t)=>e+eu(t).slot,0),o=a?Math.max(1,this.marines.reduce((e,t)=>e+eu(t).slot*eu(t).columns,0)/a):1,s=r*Q.slot*o,c=[],l=[],u=0;for(let e of this.marines){let t=eu(e).slot,n=e=>e.skin??e.kind,r=l.length&&n(l.at(-1).unit)!==n(e)?Q.kindGap:0;l.length&&u+r+t>s+1e-6&&(c.push({units:l,width:u}),l=[],u=0);let i=r;l.push({unit:e,width:t,lead:i}),u+=i+t}l.length&&c.push({units:l,width:u});let d=c[0]?.units.findIndex(e=>e.unit.hero)??-1;if(d>=0){let[e]=c[0].units.splice(d,1);c[0].units.splice(Math.floor(c[0].units.length/2),0,e)}let f=e=>Math.max(...e.units.map(e=>eu(e.unit).depth)),p=c.reduce((e,t,n)=>n?e+(f(t)+f(c[n-1]))/2:e,Q.frontZ)+(c.length?Math.max(0,f(c.at(-1))-Q.rowPitch)/2:0);this.frontAdvance=cu(p+Q.tankGap-Q.rearLimit,0,Q.maxAdvance),this.frontZ=Q.frontZ-this.frontAdvance;let m=this.frontZ,h=null;c.forEach((t,n)=>{let r=Math.max(...t.units.map(e=>eu(e.unit).depth));n&&(m+=(r+Math.max(...c[n-1].units.map(e=>eu(e.unit).depth)))/2);let a=e=>e.skin??e.kind;t.units.forEach((e,n)=>{e.lead=n&&a(t.units[n-1].unit)!==a(e.unit)?Q.kindGap:0}),t.width=t.units.reduce((e,t)=>e+t.lead+t.width,0);let o=Math.max(0,i-t.width/2),s=cu(this.x,-o,o);n||(h={centre:s,half:t.width/2});let l=-t.width/2;t.units.forEach(({unit:t,width:n,lead:r})=>{l+=r;let i=s+l+n/2;l+=n,t.x+=(i-t.x)*(1-Math.exp(-e*19)),t.z=m,t.recoil=Math.max(0,t.recoil-e*9),t.hit=Math.max(0,t.hit-e*4),t.arrival=Math.max(0,t.arrival-e*2),t.attackAnimation=Math.max(0,t.attackAnimation-e)})});let g=c.length?Math.max(...c.at(-1).units.map(e=>eu(e.unit).depth)):Q.rowPitch,_=(c.length?m:this.frontZ)+Math.max(0,g-Q.rowPitch)/2,v=e=>e.skin??e.kind,y=e=>Q.air.includes(v(e)),b=(e,t)=>Q.rearOrder.indexOf(v(e))-Q.rearOrder.indexOf(v(t)),x=[...this.supports.filter(e=>e.kind!==`colossus`&&e.skin!==`odin`&&!y(e)&&!n.includes(e)),...this.tanks].sort(b),S=new Map,C=new Set,w=e=>{if(!e.length)return 1;let t=e.map(e=>Q.rearWidth[v(e)]??2.5),n=e.map((t,n)=>n&&v(e[n-1])!==v(t)?Q.rearGap:0),r=t.reduce((e,t,r)=>e+t+n[r],0),i=Math.min(1,Q.halfDeck*2/r),a=cu(this.x,-Q.halfDeck+r*i/2,Q.halfDeck-r*i/2),o=-r/2;return e.forEach((e,r)=>{o+=n[r],S.set(e,a+(o+t[r]/2)*i),o+=t[r]}),i};if(w(x)<Q.splitBelow){let e=x.filter(e=>!this.tanks.includes(e));w(x.filter(e=>this.tanks.includes(e))),w(e);for(let t of e)C.add(t)}let T=e=>Q.flank.includes(v(e));w(this.supports.filter(e=>y(e)&&!T(e)).sort(b));let E=new Map;this.supports.filter(T).sort(b).forEach((e,t)=>{S.set(e,(t%2?1:-1)*Q.flankX),E.set(e,Math.floor(t/2))});let D=new Map,O=h??{centre:cu(this.x,-Q.halfDeck,Q.halfDeck),half:0},k={[-1]:this.frontZ+Q.sideBack,1:this.frontZ+Q.sideBack};n.forEach((e,t)=>{let n=t%2?1:-1,r=Q.sideHalf[e.kind];S.set(e,cu(O.centre+n*(O.half+Q.thorGap+r),-Q.thorEdge,Q.thorEdge)),D.set(e,k[n]),k[n]+=Q.sideStep[e.kind]}),this.tanks.forEach(t=>{t.x+=(S.get(t)-t.x)*(1-Math.exp(-e*12)),t.z=Math.max(Q.minTankZ,_+Q.tankGap),t.recoil=Math.max(0,t.recoil-e*3),t.hit=Math.max(0,t.hit-e*4),t.arrival=Math.max(0,t.arrival-e*2),t.attackAnimation=Math.max(0,(t.attackAnimation??0)-e)});let A=n.find(e=>e.kind===`thor`),j=Q.odinReach,M=cu(this.x+(A?1:-1)*Q.odinOffset,-j,j),N=this.supports.filter(e=>e.kind===`colossus`),ee=new Set(N.filter(e=>e.colossusSlot!==void 0).map(e=>e.colossusSlot));for(let e of N)if(e.colossusSlot===void 0){let t=0;for(;ee.has(t);)t++;e.colossusSlot=t,ee.add(t)}let te=N.length>1||N.some(e=>e.colossusPaired),ne=te?Q.colossusPair/2:0,re=cu(this.x,-3.6+ne,3.6-ne),P=cu(_+Q.colossusGap,Q.minColossusZ,Q.maxColossusZ),ie=new Map;for(let e of N)e.colossusPaired=te,ie.set(e,{x:re+(e.colossusSlot%2?1:-1)*ne,row:Math.floor(e.colossusSlot/2)});let F=N.length>0;this.supports.forEach(t=>{if(t.hp>0&&t.odinBarrage?.until>this.time){t.hit=Math.max(0,t.hit-e*4),t.arrival=Math.max(0,t.arrival-e*2);return}let n=t.kind===`colossus`,r=t.skin===`odin`,i=n||r,a=ie.get(t),o=n?a.x:r?M:S.get(t);if(t.x+=(o-t.x)*(1-Math.exp(-e*12)),t.z=D.has(t)?D.get(t):E.has(t)?Q.flankZ+E.get(t)*Q.flankStep:Math.max(i?Q.minColossusZ:Q.minSupportZ,_+(i?Q.colossusGap:Q.supportGap))+(r&&F?1.6:0)+(C.has(t)?Q.secondRow:0)+(y(t)?Q.airGap:0),n&&(t.z=P-a.row*Q.colossusRow),r)for(let[e,n]of D)Math.abs(S.get(e)-o)<Q.odinClear&&(t.z=Math.max(t.z,n+Q.odinBehind));t.recoil=Math.max(0,t.recoil-e*5),t.hit=Math.max(0,t.hit-e*4),t.arrival=Math.max(0,t.arrival-e*2),t.attackAnimation=Math.max(0,t.attackAnimation-e)})}repairLine(e){let t=this.line;return this.line=Math.min(zl.hp,this.line+zl.hp*e),this.line-t}usePower(e,t=null){return this.powers?.use(e,t)??!1}adoptPet(e=1,t=0,n=``){if(this.state!==`ready`||this.pet)throw Error(`A companion must join before deployment`);return xe(this,e,t,n)}damageUnit(e,t,n=`zergling`){if(!(e.hp<=0)){if(t*=this.enemyDamageScale,e===this.pet){Oe(this,t,n);return}if(e.lastHitAt=this.time,!((e.invulnerableUntil??-1/0)>this.time)){if(e.shield>0){let n=Math.min(e.shield,t);if(e.shield-=n,t-=n,e.shieldHitAt=this.time,e.shieldBroke=e.shield<=0,this.events.push({type:`shieldHit`,x:e.x,z:e.z,broken:e.shield<=0}),t<=0)return}if(e.ward>0){let n=Math.min(e.ward,t);if(e.ward-=n,t-=n,t<=0)return}gs(this,e,t)||(this.damageTaken+=Math.min(e.hp,t),e.hp=Math.max(0,e.hp-t),e.hit=1,this.events.push({type:`breach`,x:e.x,z:e.z,attacker:n,victimKind:e.kind}),e.hp===0&&(this.losses++,this.events.push({type:`casualty`,x:e.x,z:e.z,kind:e.kind,skin:e.skin,scale:e.scale,yaw:e.yaw??0,id:e.id})))}}}damageEnemy(e,t,n=!1,r=null){if(e.dead)return;this.heroic.size&&(t*=this.heroicDamage(r));let i=jl.has(r?.weapon)?0:this.enemyArmor(e);if(i>0&&(t=Math.max(Math.min(t,be),t-i)),(e.sunderedUntil??-1)>this.time&&(t*=1+q.tempest.sunder.amp),e.lastHitAt=this.time,e.barrier===`ready`&&(e.barrier=`up`,e.shield=e.shieldMax=e.maxHp*jc.barrier.shield,e.shieldUntil=this.time+jc.barrier.duration,this.events.push({type:`shieldHit`,x:e.x,z:e.z,kind:e.kind})),e.shield>0&&this.time<e.shieldUntil){let n=Math.min(e.shield,t);if(e.shield-=n,t-=n,e.hit=1,t<=0)return}let a=this.report.record(e.hp,t,r);a&&(e.hp=Math.max(0,e.hp-a),e.hit=1,e.hp<=0&&(e.dead=!0,this.kills++,this.combo++,this.comboTimer=1.7,Fs(this,e),r?.weapon===`flame`&&this.wildfireStep<jn.perStep&&(this.wildfireStep++,this.addWildfire(e.x,e.z,r)),this.recordKill(),this.bestCombo=Math.max(this.bestCombo,this.combo),this.gainXp(ze(e),e),this.events.push({type:`kill`,id:e.id,x:e.x,z:e.z,kind:e.kind,big:n||e.big,scale:e.scale,phase:e.phase,weapon:r?.weapon,presentationDelay:r?.presentationDelay??0}),e.revives>0&&(this.revivals.push({kind:e.kind,x:e.x,z:e.z,at:this.time+jc.justDie.delay}),this.events.push({type:`reviveMark`,x:e.x,z:e.z,delay:jc.justDie.delay,big:e.big}))))}updateRevivals(){if(!this.revivals.length)return;let e=this.revivals.filter(e=>e.at<=this.time);if(e.length){this.revivals=this.revivals.filter(e=>e.at>this.time);for(let t of e){let e=this.enemies.length;this.reviving=t;try{t.kind===`zergling`?this.spawnEnemy(t.z,t.x):t.kind===`hydralisk`?this.spawnHydralisk(t.z,t.x):t.kind===`baneling`?this.spawnBaneling(t.z,t.x):t.kind===`roach`?this.spawnRoach(t.z,t.x):t.kind===`aberration`&&this.spawnAberration(t.z,t.x)}finally{this.reviving=null}this.enemies.length!==e&&this.revived++}}}recordKill(){this.killBuckets[this.killBucketTick%this.killBuckets.length]++,this.recentKills++,this.peakKillRate=Math.max(this.peakKillRate,this.recentKills/3)}updateKillRate(){let e=Math.floor(this.time*10);for(;this.killBucketTick<e;){this.killBucketTick++;let e=this.killBucketTick%this.killBuckets.length;this.recentKills-=this.killBuckets[e],this.killBuckets[e]=0}}nearbyEnemies(e,t,n){return this.gridReady?this.enemyGrid.query(e,t,n):this.enemies}gainXp(e,t=null){if(!(e>0))throw Error(`gainXp needs a positive amount, got ${e}`);let n=e*(1+hn*this.general.drill);this.xp+=n,pe(this,n),t&&e>=8&&this.events.push({type:`xp`,x:t.x,z:t.z,amount:+n.toFixed(1)}),this.advanceResearch()}advanceResearch(){for(;this.xp>=s(this.researchLevel+1);){this.researchLevel++;let e=this.researchLevel%3==0;e&&(this.overdrive=Math.max(this.overdrive,2),this.overdrives++),this.researchHistory.push({time:+this.time.toFixed(2),kills:this.kills,xp:Math.round(this.xp),level:this.researchLevel}),this.events.push({type:`research`,text:I(`event.research`,{level:De(this.researchLevel)}),detail:I(e?`event.researchBurst`:`event.researchDetail`),burst:e,x:this.x,z:10}),this.pendingLevelUps++}}get powerScale(){return this.damageScale*(this.endless?Z.powerGrowth**Math.max(0,this.endless.layer-1):1)}get airSupportScale(){return this.damageScale*(this.endless?Pc(this.endless.layer):1)}get buffScale(){return(1+Z.boost.damage*(this.endless?.damageBoost??0))*Je(this,`damage`)*ml(this,`damage`)}get damageScale(){return Nn(this.weaponLevel-1,this.researchLevel)*this.buffScale}damageBoss(e,t=null){if(!this.boss||this.boss.dead)return;this.heroic.size&&(e*=this.heroicDamage(t)),(this.boss.sunderedUntil??-1)>this.time&&(e*=1+q.tempest.sunder.amp);let n=this.report.record(this.boss.hp,e,t,!0);n&&(this.boss.hp=Math.max(0,this.boss.hp-n),this.boss.hit=1,this.boss.hp===0&&(this.boss.dead=!0,this.kills++,this.endless&&(this.xp=Math.max(this.xp,s(this.researchLevel+1)),this.advanceResearch()),this.rerolls++,this.recordKill(),this.events.push({type:`bossDeath`,x:this.boss.x,z:this.boss.z,presentationDelay:t?.presentationDelay??0}),this.bounties=(this.bounties??0)+1,this.endless?(this.line=Math.min(zl.hp,this.line+Z.lineRepair),this.queueBounty()):this.sandbox||this.finish(`victory`)))}pickMarineTarget(e){let t=null,r=1/0,i=eu(e).weapon,a=i===`flame`?q[e.kind].range+(e.kind===`firebat`?n.flameRange*(this.modules.flame??0):0):i===`lineflame`?Us(this):i===`plasma`?_s(this):i===`blade`?vs(this,e):i===`psionic`?q.archon.range:q.marine.range,o=ru(e),s=this.gridReady,c=s?this.enemyGrid.queryRect(e.x-Q.arc-kl,e.x+Q.arc+kl,e.z-a-kl,N+kl,this.pickScratch):this.enemies;if(s)for(let e=this.enemyGrid.count;e<this.enemies.length;e++)this.enemies[e].gridIndex=e,c.push(this.enemies[e]);let l=1/0,u=i===`rifle`&&e.z<=this.frontRifleZ+Q.rowPitch/2,d=null,f=1/0,p=1/0;for(let n=0;n<c.length;n++){let i=c[n];if(i.dead||i.z<e.z-a||i.z>17.2||Math.abs(i.x-e.x)>Q.arc||o&&Math.hypot(i.x-e.x,i.z-e.z)>=a)continue;let m=i.z-e.z,h=(m>.5?2.5+m:-m)+Math.abs(i.x-e.x)*.8,g=s?i.gridIndex:n;(h<r||h===r&&g<l)&&(t=i,r=h,l=g),u&&i.clawing&&(h<f||h===f&&g<p)&&(d=i,f=h,p=g)}d&&(t=d);let m=this.boss;if(m&&!m.dead&&m.z>e.z-a&&Math.abs(m.x-e.x)<6&&(!ru(e)||Math.hypot(m.x-e.x,m.z-e.z)<a+(i===`blade`?2.5:0))&&(!t||e.z<=8.5||m.z>t.z+2))return{target:m,boss:!0};let h=this.pod;return h&&h.state===`landed`&&h.z<e.z+.5&&Math.abs(h.x-this.x)<=Q.arc+1&&(!ru(e)||Math.hypot(h.x-e.x,h.z-e.z)<a)&&(!t||t.z<e.z-3)?{target:h,pod:!0}:t?{target:t,boss:!1}:null}option(e,t=this.nextGate){if(Te[e])return rr(this,e);if(e===`contract`)return this.contractOption();let n=this.roster;if(n.supports.includes(e)&&this.supportKindFull(e)&&(e=Tn[e].primary),Nc.includes(e)){let t=e===`boostDamage`,n=(t?this.endless?.damageBoost:this.endless?.rateBoost)??0,r=Math.round(Z.boost[t?`damage`:`rate`]*100);return{id:e,label:I(`option.${e}.label`,{level:n+1}),detail:I(`option.${e}.detail`,{percent:r,total:r*(n+1)}),kind:null,count:0,portrait:t?`upgrades/weapon`:`upgrades/cadence`,equipment:!1}}if(Jt.includes(e))return this.generalOption(e);if((e===n.artillery||n.artilleries?.includes(e))&&this.tankCount>=this.tankCap||[n.main,n.front,n.reinforce].includes(e)&&this.squadCount>=this.marineCap||G[e]&&!Yn(this,e)){let n=!G[e];if(n&&this.endless)return this.option(`boostRate`,t);e=n?`armor`:[`weapon`,`cadence`,`piercing`,`shells`,`reload`,`flame`].find(e=>Yn(this,e))??(this.endless?`boostDamage`:`armor`)}if(G[e]){let t=G[e],n=w(this,e)+1,r=t.equipment||t.cap>=3&&n===t.cap?`elite`:`common`;return{id:e,label:`${t.name}${t.equipment?``:` ${Wn[n]}`}`,detail:Ue(this,e),kind:null,count:0,portrait:t.affects===`all`?this.roster.mainKind:t.portrait,equipment:!!t.equipment,rarity:r}}let r=Math.min(this.marineCap-this.squadCount,this.supplyBodies(e,t)),i=e===n.artillery?Math.min(t<3?Pl.escortEarly:Pl.escortLate,this.marineCap-this.squadCount):0,a=Math.max(1,Math.floor(r/$l[n.mainKind].supply)),o={[n.main]:[n.mainKind,a],[n.front]:[n.frontKind,r],[n.artillery]:[n.artilleryKind,1],[n.reinforce]:[n.mainKind,a],armor:[null,0],...Object.fromEntries(n.supports.map(e=>[e,[e,1]])),...Object.fromEntries((n.artilleries??[]).filter(e=>e!==n.artilleryKind).map(e=>[e,[e,1]]))}[e];if(!o)throw Error(`Unknown supply option: ${e}`);let s=e===n.artillery&&i?I(n.escortText??`option.${e}.escort`,{escort:Math.ceil(i/$l[n.mainKind].supply)}):I(`option.${e}.detail`);return{id:e,label:I(`option.${e}.label`,{count:o[1]}),detail:s,kind:o[0],count:o[1],portrait:o[0]??`marine`,equipment:!1,escort:i,escortBodies:i?Math.ceil(i/$l[n.mainKind].supply):0,escortKind:n.mainKind,rarity:n.supports.includes(e)||n.artilleries?.includes(e)?`elite`:`common`}}generalOption(e){if(e===`repair`)return{id:e,label:I(`option.repair.label`),detail:I(`option.repair.detail`,{amount:200}),kind:null,count:0,portrait:this.roster.mainKind,equipment:!1,rarity:`common`};let t=this.general[e]+1,n=Math.round((e===`drill`?hn:Fn)*100);return{id:e,label:I(`option.${e}.label`,{level:t}),detail:I(`option.${e}.detail`,{percent:n,total:n*t}),kind:null,count:0,portrait:e===`drill`?`upgrades/weapon`:`upgrades/cadence`,equipment:!1,rarity:`common`}}contractOption(){let e=Dt.filter(e=>(Bn[e].roster??`terran`)===this.roster.contracts&&Pt(this,e)),t=e.find(e=>Bn[e].contractChance!=null&&this.draftRandom()<Bn[e].contractChance),n=e.filter(e=>Bn[e].contractChance==null);if(!t&&!n.length)return null;let r=this.draftRandom()*n.reduce((e,t)=>e+(Bn[t].weight??1),0),i=t??n.find(e=>(r-=Bn[e].weight??1)<0)??n.at(-1);return{id:`contract`,merc:i,label:I(`merc.${i}.name`),detail:I(`merc.${i}.detail`),kind:null,count:0,portrait:Bn[i].portrait,equipment:!1,rarity:`legendary`}}rewardAvailable(e){return Te[e]?H(this,e):G[e]?Yn(this,e):e===`repair`?this.line<zl.hp*un:e===`drill`?this.general.drill<Mn.drill&&this.researchLevel>=4:e===`logistics`?this.general.logistics<Mn.logistics&&!!this.powers?.ids.length:this.roster.supports.includes(e)?!this.supportKindFull(e)&&this.regularSupports.length<this.supportCap:e!==this.roster.artillery&&this.roster.artilleries?.includes(e)?this.tankCount<this.tankCap&&this.tanks.filter(t=>t.kind===e&&!t.merc).length<this.supportKindCap:e===`contract`?this.contracts&&!!this.roster.contracts&&!this.pod&&Dt.some(e=>(Bn[e].roster??`terran`)===this.roster.contracts&&Pt(this,e)):e===`armor`?!0:Nc.includes(e)?!!this.endless:e===this.roster.artillery?this.tankCount<this.tankCap:this.squadCount<this.marineCap}supplyBodies(e,t){let n=this.roster,r=t<3?Pl.early:t<7?Pl.mid:Pl.late;return e===n.main||e===n.reinforce?Io.includes(t)?r+Pl.capstoneBonus:r:Math.max(2,Math.round(r*Pl.frontShare))}crateSliver(e,t){let n=this.roster;return!!this.endless&&[n.main,n.front,n.reinforce].includes(e)&&(this.marineCap-this.squadCount)*2<this.supplyBodies(e,t)}crateUpgrade(e){for(let t of[this.moduleWeights(()=>!0),Object.fromEntries(Nc.map(e=>[e,1]))]){let n=this.drawCard(t,e);if(n){let t=this.levelOption(n);return e.add(t.id),t}}return this.levelOption(`armor`)}drawCard(e,t){let n=Object.entries(e).filter(([e,n])=>n>0&&!t.has(e)&&this.rewardAvailable(e)),r=this.draftRandom()*n.reduce((e,[,t])=>e+t,0);for(let[e,t]of n)if((r-=t)<0)return e;return n.at(-1)?.[0]??null}randomGateOptions(e){let t=new Set,n=this.roster,r=[n.main,n.reinforce],i=(n,i)=>{let a=this.option(this.drawCard(n,t)??i,e);return t.add(a.id),r.includes(a.id)&&r.forEach(e=>t.add(e)),a};if(e===0)return[i({[n.main]:1},n.main),i({[n.front]:1,[n.artillery]:1},`armor`)];if(!this.supportOrder){this.supportOrder=[...n.supports];for(let e=this.supportOrder.length-1;e>0;e--){let t=Math.floor(this.draftRandom()*(e+1));[this.supportOrder[e],this.supportOrder[t]]=[this.supportOrder[t],this.supportOrder[e]]}}let a=e>=5&&e<=7?this.supportOrder[e-5]:null;if(a&&this.rewardAvailable(a))return[i({[a]:1},`armor`),i({[n.main]:3,[n.reinforce]:1,[n.front]:1},`armor`)];let o=e>=3?this.heavyWeights(Yl):{},s={[n.main]:4,[n.reinforce]:e<5?0:2,[n.front]:1.2,[n.artillery]:e<5?1.8:1.2,...o},c=i(s,`armor`),l=(this.contractGates.includes(e)&&this.rewardAvailable(`contract`)?this.contractOption():null)??i(s,`armor`);return e%2==0?[c,l]:[l,c]}endlessGateOptions(e){let t=new Set,n=this.roster,r=[n.main,n.reinforce],i=n=>{let i=this.drawCard(n,t);if(!i)return this.crateUpgrade(t);let a=this.option(i,e);return t.add(a.id),r.includes(a.id)&&r.forEach(e=>t.add(e)),a},a=t=>this.crateSliver(t,e),o=Object.fromEntries(Object.entries({[n.main]:3,[n.front]:1,[n.artillery]:1,[n.reinforce]:1,...this.heavyWeights(.5),...Object.fromEntries((n.artilleries??[]).filter(e=>e!==n.artilleryKind).map(e=>[e,yl.weight]))}).filter(([e])=>!a(e))),s=i(o),c=((this.endless.gates-1)%on.endlessEvery==0&&this.rewardAvailable(`contract`)?this.contractOption():null)??i(o);return e%2==0?[s,c]:[c,s]}gateOptions(e){if(this.randomDraft)return this.randomGateOptions(e);let t=this.roster,n=t.plan,r=new Set,i=(t,n)=>{let i=t.find(e=>!r.has(e)&&this.rewardAvailable(e))??n,a=this.option(i,e);return r.add(a.id),a};if(e===0)return[i([t.main],t.main),i([t.front,t.artillery],`armor`)];if(t.supports.includes(n[e])&&this.rewardAvailable(n[e]))return[i([n[e]],`armor`),i([t.main,t.reinforce,t.front],`armor`)];let a=i([n[e]??t.main,t.main,t.front,t.artillery,t.reinforce],`armor`),o=i([t.main,t.front,t.artillery,t.reinforce],`armor`);return e%2==0?[a,o]:[o,a]}refreshGateOptions(){let e=this.gate,t=t=>this.rewardAvailable(t.id)&&(!t.merc||Pt(this,t.merc))&&!this.crateSliver(t.id,e.index);if(!e||e.claimed||e.options.every(t))return;let n=new Set(e.options.filter(t).map(e=>e.id)),r=Number.isInteger(e.index)?this.endless?this.endlessGateOptions(e.index):this.gateOptions(e.index):[];e.options=e.options.map(i=>{if(t(i))return i;let a=this.roster,o=[a.main,a.front,a.artillery,a.reinforce,...a.supports,...this.endless?[]:[...Nc,`armor`]].find(t=>!n.has(t)&&this.rewardAvailable(t)&&!this.crateSliver(t,e.index)),s=r.find(e=>!n.has(e.id)&&t(e))??(o||!this.endless?this.option(o??`armor`,e.index):this.crateUpgrade(n));return n.add(s.id),s}),e.equipment=e.options.some(e=>e.equipment)}selectGate(e){if(!this.gate||this.gate.claimed)return;this.refreshGateOptions(),this.gate.claimed=!0,this.lastGateAt=this.time;let t=this.gate.options[e===`left`?0:1];if(t.id===`contract`){this.upgrades.push(t.id),this.growthHistory.push({time:+this.time.toFixed(2),layer:this.endless?.layer??0,id:t.id,merc:t.merc}),this.callContract(t.merc,e===`left`?-1:1),this.events.push({type:`contract`,merc:t.merc,x:this.x,z:10,text:I(Sn(t.merc,`signed`),{name:I(`merc.${t.merc}.name`)})});return}this.applyChoice(t)}applyChoice(e){if(Te[e.id]&&Yt(this,e.id),G[e.id]&&(e.detail=Ue(this,e.id)),this.isArtillery(e.kind)&&e.kind!==this.roster.artilleryKind?this.addTank(e.kind):e.kind===this.roster.artilleryKind?(this.addTank(e.kind),this.addMarines(Math.ceil((e.escort??0)/$l[this.roster.mainKind].supply),this.roster.mainKind)):this.roster.supports.includes(e.kind)?this.addSupport(e.kind):e.kind&&this.addMarines(e.count,e.kind),(e.kind||G[e.id]?.requires)&&(this.focusKind=e.kind??G[e.id].requires),e.id===`weapon`&&this.weaponLevel++,e.id===`piercing`&&this.piercing++,e.id===`boostDamage`&&this.endless.damageBoost++,e.id===`boostRate`&&this.endless.rateBoost++,G[e.id]&&![`weapon`,`piercing`].includes(e.id)&&(this.modules[e.id]=(this.modules[e.id]??0)+1),e.id===`plating`)for(let e of this.marines)e.kind===`firebat`&&(e.maxHp+=n.platingHp,e.hp+=n.platingHp);e.id===`archon`&&Ss(this),e.id===this.roster.reinforce&&this.allies.forEach(e=>{e.hp=e.maxHp,e.protossShield&&(e.shield=e.shieldMax)}),e.id===`armor`&&(this.armor+=2,this.allies.forEach(e=>{e.maxHp+=2,e.hp=e.maxHp})),e.id===`repair`&&(this.line=Math.min(zl.hp,this.line+200)),(e.id===`drill`||e.id===`logistics`)&&this.general[e.id]++,this.upgrades.push(e.id),this.mutators.length&&this.mutatorStart===1/0&&this.upgrades.length>=Ac(this.mutators.length)&&(this.mutatorStart=this.time,this.events.push({type:`mutators`,ids:[...this.mutators]})),this.growthHistory.push({time:+this.time.toFixed(2),layer:this.endless?.layer??0,id:e.id,equipment:e.equipment}),this.events.push({type:`upgrade`,text:e.label,detail:e.detail,choice:e.id,portrait:e.portrait,equipment:e.equipment,x:this.x,z:10}),this.refreshSynergies()}refreshSynergies(){this.daelaam?.maxed&&this.equipDaelaam();for(let e of Ut(this))this.formedSynergies.add(e.id),!this.announcedSynergies.has(e.id)&&(this.announcedSynergies.add(e.id),this.synergyHistory.push({id:e.id,time:+this.time.toFixed(2)}),this.events.push({type:`synergy`,...e,tier:`formed`,text:e.name,x:this.x,z:10}));for(let e of Object.keys(yt)){if(this.heroic.has(e))continue;let t=$n(this,e);if(t.have<t.need)continue;let n=Ct(this,e);this.heroic.add(e),this.nameHeroes(e),this.events.push({type:`heroic`,unit:e,id:n.id,name:n.name,detail:n.detail,names:this.heroNames(e)})}this.heroicHealth()}heroicHealth(){if(this.heroic.size)for(let e of[this.marines,this.tanks,this.supports])for(let t of e){if(t.heroicHealth||!this.heroic.has(t.kind))continue;let e=1+Tt(t.kind).health;t.maxHp*=e,t.hp*=e,t.heroicHealth=!0}}heroicDamage(e){return!this.heroic.size||!e?.line||!this.heroic.has(e.line)||re.has(e.weapon)?1:1+Tt(e.line).damage}nameHeroes(e){let t=Dc[e];if(!t)return;let n=()=>{let e=Ec[t].length,n=[];for(let r=0;r<e;r++)this.usedNames.has(`${t}:${r}`)||n.push(r);let r=n.length?n[Math.floor(this.nameRandom()*n.length)]:Math.floor(this.nameRandom()*e);return this.usedNames.add(`${t}:${r}`),`${t}:${r}`};if(Oc.includes(e)){this.squadNames[e]??=n();return}for(let t of[...this.tanks,...this.supports])t.kind===e&&!t.merc&&t.hp>0&&!t.heroName&&(t.heroName=n())}heroNames(e,{fallen:t=!1}={}){let n=We();return Oc.includes(e)?this.squadNames[e]?[kc(this.squadNames[e],n)]:[]:[...this.tanks,...this.supports].filter(n=>n.kind===e&&n.heroName&&(t||n.hp>0)).map(e=>kc(e.heroName,n))}heroRoll(e){let t=We();return Oc.includes(e)?this.squadNames[e]?[{name:kc(this.squadNames[e],t),alive:!0}]:[]:[...this.tanks,...this.supports].filter(t=>t.kind===e&&t.heroName).map(e=>({name:kc(e.heroName,t),alive:e.hp>0}))}synergyScale(e){let t=Lt[e];if(!t||t.percent===void 0)throw Error(`Synergy ${e} has no percent bonus`);return this.formedSynergies.has(e)?1+t.percent/100:1}synergyCount(e){let t=Lt[e];if(!t||t.count===void 0)throw Error(`Synergy ${e} has no count bonus`);return this.formedSynergies.has(e)?t.count:0}get burnDuration(){return sr.napalm.duration*this.synergyScale(`scorched-ground`)}get shrapnelRadius(){return sr.shrapnel.radius*this.synergyScale(`fragment-storm`)}get draftFocus(){return qn(this,this.focusKind)?this.focusKind:Object.keys(Tn).find(e=>qn(this,e))??`marine`}levelOption(e){let t=this.option(e);t.unit=Te[t.id]?`pet`:G[t.id]?.requires??null;let n=this.synergyTag(t.id);n&&(t.synergy=n);let r=this.heroicTag(t.id);return r&&(t.heroic=r),t}synergyTag(e){if(!G[e])return null;let t=null,n=null;for(let r of At){let i=r.requires[e];if(!i||w(this,e)>=i||!gt(this,r))continue;let a=an(this,r);n&&a.have<=n.have||(t=r,n=a)}return t&&{id:t.id,name:t.name,have:n.have,need:n.need,bonus:t.bonus,completes:n.have+1===n.need}}heroicTag(e){let t=G[e]?.requires;if(!t||!yt[t]||this.heroic.has(t))return null;let n=Ct(this,t),r=Ct(this,t,e);return r.have<=n.have?null:{unit:t,id:n.id,name:n.name,have:n.have,need:n.need,completes:r.have===r.need}}synergyPull(e){return this.synergyTag(e)?.completes??!1}moduleWeights(e){let t={};for(let[n,r]of Object.entries(G))e(r,n)&&Yn(this,n)&&(t[n]=(r.equipment?Il:1)*(this.synergyPull(n)?3:1));return t}generalWeights(){return Object.fromEntries(Jt.filter(e=>this.rewardAvailable(e)).map(e=>[e,e===`drill`?vn:1]))}randomLevelCards(e){let t=this.draftFocus,n=[()=>({...this.moduleWeights(e=>e.requires===t),weapon:Ll}),()=>({...this.moduleWeights(e=>e.requires&&e.requires!==t),...Qe(this),weapon:Ll}),()=>{let e=this.generalWeights();return Object.keys(e).length&&this.draftRandom()<.4?e:{...this.moduleWeights(()=>!0),...Qe(this)}}],r=new Set,i=[];for(let t of n){let n=[t(),this.moduleWeights(()=>!0),this.generalWeights(),this.endless?Object.fromEntries(Nc.map(e=>[e,1])):{},{armor:1}],a=e=>{for(let t of n){let n=this.drawCard(t,e);if(n)return n}return null},o=a(new Set([...r,...e]))??a(r)??`armor`,s=this.levelOption(o);r.add(s.id),i.push(s)}return i}fixedLevelCards(e,t){let n=this.draftFocus,r=Tn[n],i=e-1,a=e%4==0,o=[r.secondary,r.primary,r.equipment,r.equipment,`weapon`,r.primary,r.secondary,r.equipment,r.late??r.primary,`weapon`,r.secondary,r.equipment,r.late??r.primary,`weapon`,r.secondary],s=this.offeredOrdnance.slice(-2),c=s.length===2&&s.every(e=>G[e]?.requires===n),l=Object.keys(G).filter(e=>G[e].requires&&G[e].requires!==n&&Yn(this,e)),u=[...a?Object.keys(G).filter(e=>G[e].equipment&&this.roster.supports.includes(G[e].requires)&&Yn(this,e)):[],...c?[...a?l.filter(e=>G[e].equipment):[],...l,`weapon`]:[],o[i]??r.primary,...a?[r.equipment]:[],r.primary,r.secondary,r.equipment,`weapon`,...l,...Object.keys(G),...Jt,...this.endless?Nc:[],`armor`],d=e=>{let t=new Set(e),n=[];for(let e of u){if(n.length===3)break;if(t.has(e)||!this.rewardAvailable(e))continue;let r=this.levelOption(e);t.has(r.id)||(t.add(r.id),n.push(r))}return n},f=d(t);for(f.length<3&&(f=d([]));f.length<3;)f.push(this.levelOption(`armor`));return f}levelUpOptions(e,t=[]){let n=this.randomDraft?this.randomLevelCards(new Set(t)):this.fixedLevelCards(e,t),r=[],i=e=>r.some(t=>t.id===e);for(let e of n)i(e.id)||r.push(e);if(r.length<3){let e=[...Object.keys(this.moduleWeights(e=>!e.requires||qn(this,e.requires))),...Jt.filter(e=>this.rewardAvailable(e)),`armor`];for(let n of e)r.length>=3||i(n)||t.includes(n)||r.push(this.levelOption(n))}this.daelaam?.stage===`done`&&this.extraSlot(r,t,{...this.moduleWeights(e=>Sl.includes(e.requires)),...Object.fromEntries(yl.units.map(e=>[e,1]))},`protoss`,!0);let a=tt(this);return Object.keys(a).length&&(!r.some(e=>G[e.id]||Te[e.id])||this.draftRandom()<g.wyrmSlotChance)&&this.extraSlot(r,t,a,`wyrm`,!1),!this.randomDraft&&!t.length&&G[r[0].id]&&this.offeredOrdnance.push(r[0].id),r}extraSlot(e,t,n,r,i){let a=new Set(e.map(e=>e.id)),o=this.drawCard(n,new Set([...a,...t]))??this.drawCard(n,a),s=!!o;if(!o&&i){for(let e of[this.moduleWeights(()=>!0),this.generalWeights(),this.endless?Object.fromEntries(Nc.map(e=>[e,1])):{},{armor:1}])if(o=this.drawCard(e,a),o)break}if(!o)return;let c=this.levelOption(o);s&&(c.slot=r),e.push(c)}preferredLevelUp(e){let t=this.levelUpPreference;if(!t)return e[0];let n=e[0],r=1/0;for(let i of e){let e=t.indexOf(i.id);e>=0&&e<r&&(n=i,r=e)}return n}openLevelUp(){if(this.pendingLevelUps<=0)throw Error(`openLevelUp with no level pending`);if(this.interactiveLevelUps){this.offerLevelUp(),this.state=`levelup`;return}for(;this.pendingLevelUps>0;){let e=this.researchLevel-this.pendingLevelUps+1;this.applyChoice(this.preferredLevelUp(this.levelUpOptions(e))),this.pendingLevelUps--}}offerLevelUp(){let e=this.researchLevel-this.pendingLevelUps+1;this.levelUp={level:e,options:this.levelUpOptions(e),rerolls:this.rerolls},this.events.push({type:`levelup`,level:e})}selectLevelUp(e){if(!this.levelUp)throw Error(`selectLevelUp with no offer open`);let t=this.levelUp.options[e];if(!t)throw Error(`selectLevelUp: no card ${e} among ${this.levelUp.options.length}`);if(this.levelUp.daelaam){this.levelUp=null,this.state=`playing`,this.grantDaelaam(t.kind);return}if(this.levelUp.vanguard){this.levelUp=null,this.state=`playing`,this.grantVanguard(t.kind);return}if(this.applyChoice(t),this.pendingLevelUps--,this.pendingLevelUps>0){this.offerLevelUp();return}this.levelUp=null,this.state=`playing`}rerollLevelUp(){if(!this.levelUp)throw Error(`rerollLevelUp with no offer open`);if(this.rerolls<=0||this.levelUp.daelaam||this.levelUp.vanguard)return!1;this.rerolls--;let e=this.levelUp.options.map(e=>e.id);return this.levelUp={level:this.levelUp.level,options:this.levelUpOptions(this.levelUp.level,e),rerolls:this.rerolls},!0}callContract(e,t){let r=0,i=1+n.cadence*(this.modules.cadence??0),a=this.overdrive>0?2:1;for(let e of this.marines){if(!nu(e)||e.hp<=0)continue;let t=(q.marine.cooldown+q.marine.jitter/2)/this.rateScale/i/a/(e.rateMult??1)*(e.hero?Ze[e.kind].cooldown:1);r+=q.marine.damage*this.damageScale*(e.damageMult??1)*(e.hero?Ze[e.kind].damage:1)/t}for(let e of this.marines)e.kind===`dragoon`&&e.hp>0&&(r+=q.dragoon.damage*this.damageScale*(e.damageMult??1)/(q.dragoon.cooldown/this.rateScale/(e.rateMult??1)));let o=Math.max(on.minHp,Math.round(r*on.rifleShare*on.breakSeconds));this.pod={id:this.nextPodId++,merc:e,x:t*on.laneX,z:on.landZ,hp:o,maxHp:o,fall:on.fall,state:`falling`,hit:0},this.events.push({type:`podDrop`,id:this.pod.id,merc:e,x:this.pod.x,z:this.pod.z,fall:on.fall})}updatePod(e){let t=this.pod;if(t){if(t.z+=su*e,t.hit=Math.max(0,t.hit-e*6),t.state===`falling`&&(t.fall-=e)<=0){t.state=`landed`;for(let e of this.nearbyEnemies(t.x,t.z,on.impactRadius))!e.dead&&Math.hypot(e.x-t.x,e.z-t.z)<on.impactRadius&&this.damageEnemy(e,e.hp+1e3,!0,{weapon:`pod`,kind:t.merc,presentationDelay:0});this.events.push({type:`podLand`,id:t.id,merc:t.merc,x:t.x,z:t.z})}t.z>zl.z&&(this.events.push({type:`podLost`,id:t.id,merc:t.merc,x:t.x,z:t.z}),this.pod=null)}}damagePod(e){let t=this.pod;t&&t.state===`landed`&&(t.hp-=e,t.hit=1,t.hp<=0&&this.openPod())}dropOption(e,t=0){let n=this.roster;if(t&&n===Fl.terran&&Pt(this,`odin`)&&this.random()<t)return{id:`dropOdin`,merc:`odin`,label:I(`merc.odin.name`),detail:I(`merc.odin.detail`),kind:null,count:1,portrait:Bn.odin.portrait,rarity:`legendary`};let r={main:n.main,front:n.front,heavy:n.supports.includes(`thor`)?`thor`:null,artillery:n.artillery},i=this.squadCount<this.marineCap,a={main:i,front:i&&!!n.front,heavy:!!r.heavy&&this.regularSupports.length<this.supportCap&&!this.supportKindFull(r.heavy),artillery:!!n.artillery&&this.tankCount<this.tankCap},o=Object.entries(e).filter(([e])=>r[e]&&a[e]),s;if(o.length){let e=this.random()*o.reduce((e,[,t])=>e+t,0);s=this.option(r[(o.find(([,t])=>(e-=t)<0)??o[o.length-1])[0]])}else s={id:`dropHeal`,label:I(`power.drop.heal`),detail:I(`power.drop.full`),kind:null,count:0,portrait:n.mainKind,rarity:`common`};return s}landDrop(e){let t=this.roster,n=e.option,r=new Set(this.allies.map(e=>e.id));n.merc?this.fieldMercenaries(n.merc,e.x,e.z):n.kind===t.artilleryKind?(this.addTank(n.kind),this.addMarines(n.escortBodies??0,t.mainKind)):t.supports.includes(n.kind)?this.addSupport(n.kind):n.kind?this.addMarines(n.count,n.kind):this.allies.forEach(e=>{e.hp=e.maxHp,e.protossShield&&(e.shield=e.shieldMax)});for(let t of this.allies)r.has(t.id)||(t.x=e.x+(this.random()-.5)*1.2,t.arrival=1);this.refreshSynergies(),this.events.push({type:`dropLand`,id:e.id,x:e.x,z:e.z,choice:n.id,kind:n.kind,count:n.count,merc:n.merc,text:n.label,detail:n.detail,portrait:n.portrait,rarity:n.rarity})}fieldMercenaries(e,t,n){let r=Bn[e];if(r.once&&this.mercenaryHistory.includes(e))return;let i=Math.max(0,Math.min(r.count,r.cap-dn(this,e)));for(let a=0;a<i;a++){let i=lu[r.unit]*r.hp+this.armor,o={id:this.nextUnitId++,kind:r.unit,skin:r.skin,merc:e,damageMult:r.damage,rateMult:r.rate,hp:i,maxHp:i,x:t+(a-(r.count-1)/2)*.6,z:n,yaw:0,cooldown:.3+a*.05,phase:this.random()*6.28,recoil:0,hit:0,arrival:1,attackAnimation:0,attackDuration:.3,scale:r.scale};this.report.deploy(e),ms(this,o),$l[r.unit]?this.marines.push(o):r.unit===`tank`||r.unit===`reaver`?this.tanks.push(o):this.supports.push(o)}this.marines.sort((e,t)=>iu(e)-iu(t)),this.mercenaryHistory.push(e)}openPod(){let e=this.pod;this.fieldMercenaries(e.merc,e.x,e.z),this.events.push({type:`podOpen`,id:e.id,merc:e.merc,x:e.x,z:e.z,text:I(Sn(e.merc,`landed`),{name:I(`merc.${e.merc}.name`)})}),this.pod=null}shyFromPod(e,t){let n=this.pod;if(!n||e.z>n.z+on.clearAhead)return;let r=Math.sign(n.x);if(e.shyPod!==n.id){if(e.homeX*r<=-on.clearMargin)return;e.shyPod=n.id,e.shyX=-r*Math.max(on.clearMargin+.2,Math.abs(e.homeX))}e.homeX+=cu(e.shyX-e.homeX,-on.shove*t,on.shove*t)}openDaelaam(){this.daelaam={stage:`bombard`,layer:this.endless.layer,choice:null,commsAt:this.time+yl.commsAfter},Zc(this.powers,{quiet:!0})}openDaelaamComms(){if(this.state===`playing`){if(this.interactiveLevelUps&&this.daelaamBrief){this.daelaam.stage=`brief`,this.daelaam.pickAt=this.time+yl.brief,this.events.push({type:`daelaamComms`,commander:this.commander,brief:!0});return}this.daelaam.stage=`comms`,this.events.push({type:`daelaamComms`,commander:this.commander}),this.interactiveLevelUps?(this.state=`levelup`,this.levelUp={daelaam:`comms`,level:this.researchLevel,options:[],rerolls:0}):this.continueDaelaam()}}continueDaelaam(){if(this.daelaam?.stage!==`comms`)throw Error(`continueDaelaam with no transmission open`);this.levelUp?.daelaam===`comms`&&(this.levelUp=null,this.state=`playing`),this.offerDaelaam()}offerDaelaam(){this.daelaam.stage=`pick`,this.daelaam.maxed??=Object.fromEntries(yl.units.map(e=>{let t=h(e).filter(e=>G[e].cap>1);return[e,t[Math.floor(this.random()*t.length)]]})),this.daelaam.equipped??=new Set;let e=yl.units.map(e=>({id:e,label:I(`daelaam.pick.label`,{unit:I(`unit.${e}`),count:yl.warp}),detail:`${I(`option.${e}.detail`)}<br>${I(`daelaam.pick.cards`,{card:I(`module.${this.daelaam.maxed[e]}.name`)})}`,heroic:{completes:!0,name:I(`heroic.${yt[e].id}.name`)},kind:e,count:yl.warp,portrait:e,equipment:!1,rarity:`legendary`}));this.events.push({type:`daelaamPick`}),this.interactiveLevelUps?(this.state=`levelup`,this.levelUp={daelaam:`pick`,level:this.researchLevel,options:e,rerolls:0}):this.grantDaelaam(this.preferredLevelUp(e).kind)}grantDaelaam(e){if(this.daelaam?.stage!==`pick`||!yl.units.includes(e))throw Error(`grantDaelaam: ${e} is not on offer`);this.daelaam.stage=`done`,this.daelaam.choice=e;for(let t=0;t<yl.warp;t++)yl.artillery.includes(e)?this.addTank(e,{grant:!0}):this.addSupport(e,{grant:!0});this.focusKind=e,this.growthHistory.push({time:+this.time.toFixed(2),layer:this.endless?.layer??0,id:`daelaam`,kind:e}),this.events.push({type:`daelaamJoin`,kind:e,units:[...yl.units]}),this.refreshSynergies()}equipDaelaam(){for(let e of yl.units)if(!this.daelaam.equipped.has(e)&&qn(this,e)){this.daelaam.equipped.add(e);for(let t of h(e))this.modules[t]=Math.max(this.modules[t]??0,t===this.daelaam.maxed[e]?G[t].cap:1)}}openVanguard(){this.vanguard={stage:`call`,layer:this.endless.layer,choice:null,pickAt:this.time+bl.pickAfter},Yc(this.powers,bl.orbital),this.events.push({type:`vanguardComms`,commander:this.commander})}offerVanguard(){this.vanguard.stage=`pick`;let e=bl.units.map(e=>({id:e,label:I(`vanguard.pick.label`,{unit:I(`unit.${e}`),count:bl.warp}),detail:I(`option.${e}.detail`),kind:e,count:bl.warp,portrait:e,equipment:!1,rarity:`legendary`}));this.events.push({type:`vanguardPick`}),this.interactiveLevelUps?(this.state=`levelup`,this.levelUp={vanguard:`pick`,level:this.researchLevel,options:e,rerolls:0}):this.grantVanguard(this.preferredLevelUp(e).kind)}grantVanguard(e){if(this.vanguard?.stage!==`pick`||!bl.units.includes(e))throw Error(`grantVanguard: ${e} is not on offer`);this.vanguard.stage=`done`,this.vanguard.choice=e;for(let t=0;t<bl.warp;t++)this.addSupport(e,{grant:!0}),this.supports.at(-1).vanguard=!0;this.focusKind=e,this.growthHistory.push({time:+this.time.toFixed(2),layer:this.endless?.layer??0,id:`vanguard`,kind:e}),this.events.push({type:`vanguardJoin`,kind:e,count:bl.warp}),this.refreshSynergies()}continueEndless(){return this.state!==`victory`||this.endless?!1:(this.state=`playing`,this.endless={layer:0,nextLayerAt:this.time+Z.firstLayerDelay,nextGateAt:this.time+Z.firstGate,gates:0,queue:[],damageBoost:0,rateBoost:0,bosses:0,startedAt:this.time},this.events.push({type:`endless`}),this.bounties&&this.queueBounty(),!0)}queueBounty(){this.endless.queue.push({at:this.time+Jl,supply:!0,bounty:!0})}retreat(){this.endless&&[`playing`,`paused`].includes(this.state)&&(this.state=`playing`,this.finish(`retreat`))}launchWave(e,t){let n=Math.round(e.count*Bo.waveScale),r=Wo.teach[t-1],i=e.lane??r??Wo.centers.filter(e=>e!==this.lastLane)[Math.floor(this.random()*2)];this.lastLane=i,this.activeWaves.push({index:t,remaining:n,total:n,perSecond:n/(e.over*Bo.overScale),debt:0,lane:i,spread:e.spread??Wo.halfWidth});let a=e.hydralisks??0,o=e.banelings??0,s=e.roaches??0,c=e=>cu(Math.ceil(Math.sqrt(e*1.6)),4,8),l=Math.min(5,Math.max(1,a));for(let e=0;e<a;e++)this.spawnHydralisk(-10-Math.floor(e/l)*1.6-e%2*.6,i*.6+(e%l-(l-1)/2)*2.4);let u=c(o),d=c(s);for(let e=0;e<o;e++)this.spawnBaneling(-13-Math.floor(e/u)*1.4,i*.7+(e%u-(u-1)/2)*1.6);for(let e=0;e<s;e++)this.spawnRoach(-15-Math.floor(e/d)*1.8,i*.7+(e%d-(d-1)/2)*1.8);let f=e.aberrations??0;for(let e=0;e<f;e++)this.spawnAberration(-11,cu(i*.7+(e-(f-1)/2)*3.4,-6,6));for(let[e,t]of[[`hydra`,a],[`baneling`,o],[`roach`,s],[`aberration`,f]])t&&!this.announced.has(e)&&(this.announced.add(e),this.events.push({type:e,text:I(`event.${e}`)}));this.events.push({type:`wave`,index:t,count:n,total:Uo.length,lane:i})}heraldEvent(e,t){this.heraldUntil=e.at,this.events.push({type:`herald`,key:e.herald,index:t,layer:this.endless?.layer??null,count:Math.round(e.count*Bo.waveScale),banelings:e.banelings??0,roaches:e.roaches??0,hydralisks:e.hydralisks??0,aberrations:e.aberrations??0,lead:Ho.lead})}updateEndless(){let e=this.endless;if(this.daelaam?.stage===`bombard`&&this.time>=this.daelaam.commsAt&&this.openDaelaamComms(),this.daelaam?.stage===`brief`&&this.time>=this.daelaam.pickAt&&this.state===`playing`&&this.offerDaelaam(),this.vanguard?.stage===`call`&&this.time>=this.vanguard.pickAt&&this.state===`playing`&&this.offerVanguard(),this.time>=e.nextLayerAt){e.layer++,e.layerStart=this.time,e.nextLayerAt=this.time+zc(e.layer);let t=Bc(e.layer);for(let n of Vc(e.layer)){let r=this.time+n.offset*t;e.queue.push({at:r,wave:{...n,at:r}}),n.herald&&e.queue.push({at:r-Ho.lead,herald:{...n,at:r}})}e.layer%Z.bossEvery===0&&e.queue.push({at:this.time+Z.bossOffset*t,boss:!0}),Z.mutatorLayers.includes(e.layer)&&e.queue.push({at:this.time+6*t,mutator:!0}),e.queue.push({at:this.time+Z.gateAfterCrest*t,supply:!0}),El(this,e,t),Dl(this,e,t);let n=Hc(e.layer);this.events.push({type:`layer`,layer:e.layer,supportSlot:n>Hc(e.layer-1)?n:null})}let t=e.queue.filter(e=>e.at<=this.time);t.length&&(e.queue=e.queue.filter(e=>e.at>this.time));for(let n of t)if(n.daelaam)this.openDaelaam();else if(n.vanguard)this.openVanguard();else if(n.herald)this.heraldEvent(n.herald,Uo.length+e.layer);else if(n.wave)this.launchWave(n.wave,Uo.length+e.layer);else if(n.boss){if(this.boss&&!this.boss.dead)continue;let t=Math.round(Z.bossHp*Z.bossHpGrowth**e.bosses++);this.boss={x:0,z:-3,hp:t,maxHp:t,hit:0,dead:!1,phase:0,attack:1.3},this.events.push({type:`boss`,text:I(`event.boss`)})}else if(n.supply)e.nextGateAt=Math.min(e.nextGateAt,this.time),n.bounty&&(e.bountyNext=!0,this.events.push({type:`bounty`}));else if(n.mutator){let t=Object.keys(jc).filter(e=>!this.mutators.includes(e));if(!t.length)continue;let n=t[Math.floor(this.draftRandom()*t.length)];this.mutators.push(n),this.mutatorStart===1/0&&(this.mutatorStart=this.time),this.events.push({type:`mutators`,ids:[n],layer:e.layer})}if(this.time>=e.nextGateAt&&!this.gate){let t=Fo.length+e.gates++,n=this.endlessGateOptions(t);this.gate={index:t,z:-13,claimed:!1,equipment:n.some(e=>e.equipment),options:n,bounty:!!e.bountyNext},e.bountyNext=!1,e.nextGateAt=1/0,this.events.push({type:`gate`})}}finish(e){if(this.state!==`playing`)return;this.state=e,this.events.push({type:`finish`,result:e});let t=this.pet;e===`defeat`&&t?.alive&&t.stage===en.ascendant&&this.events.push({type:`petLament`,stage:t.stage,x:t.x,z:t.z})}step(e){if(this.state!==`playing`)return;for(e=cu(e,0,.05),this.time+=e,this.wildfireStep=0,this.updateKillRate(),this.refreshSynergies(),this.overdrive=Math.max(0,this.overdrive-e),(this.comboTimer-=e)<=0&&(this.combo=0),this.updateFormation(e),this.updatePod(e),this.powers?.update(e),this.updateRevivals(),this.spawnDebt+=e*(this.sandbox?this.sandboxTrickle:this.time<this.heraldUntil?Ho.hushRate:Ko(this.time));this.spawnDebt>=1;)this.spawnEnemy(void 0,cu(this.lastLane*.35+(this.random()*2-1)*Wo.trickleHalfWidth,-6.4,6.4)),this.spawnDebt--;for(;this.nextHerald<Uo.length;){let e=Uo[this.nextHerald];if(!e.herald){this.nextHerald++;continue}if(this.time<e.at-Ho.lead)break;this.nextHerald++,this.heraldEvent(e,Uo.indexOf(e)+1)}for(;this.nextWave<Uo.length&&this.time>=Uo[this.nextWave].at;){let e=Uo[this.nextWave++];this.launchWave(e,this.nextWave)}if(this.endless&&this.updateEndless(),this.activeWaves=this.activeWaves.filter(t=>{for(t.debt+=e*t.perSecond;t.debt>=1&&t.remaining>0;){let e=cu(t.lane+(this.random()*2-1)*t.spread,-6.4,6.4);this.spawnEnemy(void 0,e),t.debt--,t.remaining--}return t.remaining>0}),this.time>=this.nextRush&&!this.rush){let e=Go.chase&&Math.abs(this.x)>=Go.chaseFrom?-Math.sign(this.x):this.rushIndex%2?1:-1;this.rushIndex++,this.rush={x:e*Go.edge,countdown:1.6,spawned:!1},this.nextRush+=Go.every}if(this.rush){if(this.rush.countdown-=e,this.rush.countdown<=0&&!this.rush.spawned){this.rush.spawned=!0;let e=Math.round(Go.count*Bo.waveScale),t=-Math.sign(this.rush.x),n=(e,t)=>((e+1)*2654435761+t*40503>>>0)%10007/10007;for(let r=0;r<e;r++)this.spawnEnemy(-16-n(r,1)*12,cu(this.rush.x+t*(n(r,2)*5.5-.9),-6.4,6.4))}this.rush.countdown<-1.2&&(this.rush=null)}if(this.peakEnemies=Math.max(this.peakEnemies,this.enemies.length),this.nextGate<Fo.length&&this.time>=Fo[this.nextGate]){let e=this.gateOptions(this.nextGate);this.gate={index:this.nextGate,z:-13,claimed:!1,equipment:e.some(e=>e.equipment),options:e},this.nextGate++,this.events.push({type:`gate`})}this.gate&&(this.gate.z+=e*au,this.gate.z>=8.4&&!this.gate.claimed&&this.selectGate(this.x<0?`left`:`right`),this.gate.z>19&&(this.gate=null));let t=this.pet?.alive?[...this.allies,this.pet]:this.allies;if(!this.bossSpawned&&this.time>=Po&&(this.bossSpawned=!0,this.boss={x:0,z:-3,hp:4400,maxHp:4400,hit:0,dead:!1,phase:0,attack:1.3},this.events.push({type:`boss`,text:I(`event.boss`)})),this.boss&&!this.boss.dead){let n=this.boss;n.z=Math.min(5,n.z+e*2.8),n.x=Math.sin(this.time*.35)*2,n.hit=Math.max(0,n.hit-e*6),n.attackAnimation=Math.max(0,(n.attackAnimation??0)-e),n.z>=4.9&&n.attack<=.55&&!n.attackAnimation&&(n.attackAnimation=n.attackDuration=.9),n.z>=4.9&&(n.attack-=e)<=0&&(n.attack=_e.ultralisk.cooldown,t.filter(e=>e.hp>0&&Math.abs(e.x-n.x)<3.7).slice(0,_e.ultralisk.maxTargets).forEach(e=>this.damageUnit(e,_e.ultralisk.damage,`ultralisk`)),this.events.push({type:`slam`,x:n.x,z:8}))}for(let n of this.enemies){if(n.dead)continue;if(n.lifted>0){n.lifted=Math.max(0,n.lifted-e),n.hit=Math.max(0,n.hit-e*8),n.liftY=n.lifted>0?Math.min(q.phoenix.height,(n.liftY??0)+q.phoenix.height/q.phoenix.rise*e):0;continue}if(n.frozen>0){n.frozen=Math.max(0,n.frozen-e),n.hit=Math.max(0,n.hit-e*8),n.frozen===0&&En(this,n);continue}if(n.kind===`aberration`){n.cooldown-=e,n.attackAnimation=Math.max(0,n.attackAnimation-e),n.hit=Math.max(0,n.hit-e*8);let r=_e.aberration,i=t.filter(e=>e.hp>0&&e.z>n.z-.5&&Math.hypot(e.x-n.x,e.z-n.z)<r.reach).sort((e,t)=>Math.hypot(e.x-n.x,e.z-n.z)-Math.hypot(t.x-n.x,t.z-n.z));if(n.clawing=i.length>0,i.length){n.cooldown<=0&&(n.cooldown=r.cooldown,n.attackAnimation=n.attackDuration=.6,i.slice(0,r.maxTargets).forEach(e=>this.damageUnit(e,r.damage,`aberration`)));continue}if(n.z+=e*this.enemySpeed(n),n.z>Bl.from&&(n.homeX+=cu(this.x-n.homeX,-Bl.clamp,Bl.clamp)*e*Bl.rate),this.shyFromPod(n,e),n.x=n.homeX+Math.sin(this.time*.9+n.phase)*.12,n.z>zl.z){n.dead=!0,this.escaped++;let e=zl.leak.aberration;this.line=Math.max(0,this.line-e),this.leakDamage+=e,this.events.push({type:`leak`,kind:n.kind,x:n.x,z:n.z,cost:e,line:this.lineRatio})}continue}if(n.kind===`roach`){n.cooldown-=e,n.attackAnimation=Math.max(0,n.attackAnimation-e),n.hit=Math.max(0,n.hit-e*8),n.hp<n.maxHp&&this.time-(n.lastHitAt??-1/0)>Ml.regenDelay&&(n.hp=Math.min(n.maxHp,n.hp+n.maxHp*Ml.regen*e));let r=_e.roach,i=null,a=r.range;for(let e of t){let t=Math.hypot(e.x-n.x,e.z-n.z);e.hp>0&&e.z>n.z&&t<a&&(i=e,a=t)}if(i)n.cooldown<=0&&(n.cooldown=r.cooldown,n.attackAnimation=n.attackDuration=.5,this.spines.push({targetId:i.id,tx:i.x,tz:i.z,remaining:r.flight,damage:r.damage,source:`roach`}),this.events.push({type:`enemyShot`,acid:!0,x:n.x,z:n.z+.7,tx:i.x,tz:i.z,flight:r.flight}));else if(n.z+=e*this.enemySpeed(n),n.z>Bl.from&&(n.homeX+=cu(this.x-n.homeX,-Bl.clamp,Bl.clamp)*e*Bl.rate*.8),this.shyFromPod(n,e),n.x=n.homeX+Math.sin(this.time*1.2+n.phase)*.15,n.z>zl.z){n.dead=!0,this.escaped++;let e=zl.leak.roach;this.line=Math.max(0,this.line-e),this.leakDamage+=e,this.events.push({type:`leak`,kind:n.kind,x:n.x,z:n.z,cost:e,line:this.lineRatio})}continue}let r=null;if(n.kind===`hydralisk`){let i=_e.hydralisk.range;for(let e of t){let t=Math.hypot(n.x-e.x,n.z-e.z);e.hp>0&&e.z>n.z&&t<i&&(r=e,i=t)}if(n.attackAnimation=Math.max(0,n.attackAnimation-e),n.cooldown-=e,r&&n.z>-1.5&&n.cooldown<=0){n.cooldown=_e.hydralisk.cooldown+this.random()*_e.hydralisk.jitter,n.attackAnimation=.45;let e=_e.hydralisk.flight;this.spines.push({targetId:r.id,tx:r.x,tz:r.z,remaining:e,damage:_e.hydralisk.damage}),this.spinesFired++,this.events.push({type:`enemyShot`,x:n.x,z:n.z+.5,tx:r.x,tz:r.z,flight:e})}}if(n.z+=e*this.enemySpeed(n)*(r&&n.z>.5?.12:1),n.z>Bl.from&&(n.homeX+=cu(this.x-n.homeX,-Bl.clamp,Bl.clamp)*e*Bl.rate),this.shyFromPod(n,e),n.x=n.homeX+Math.sin(this.time*2+n.phase)*.22,n.hit=Math.max(0,n.hit-e*8),n.z>7.5-this.frontAdvance){let e;for(let r of t)if(r.hp>0&&Math.abs(r.x-n.x)<.85&&Math.abs(r.z-n.z)<.8){e=r;break}if(e&&n.kind===`baneling`){let e=_e.baneling;t.filter(t=>t.hp>0&&Math.hypot(t.x-n.x,t.z-n.z)<e.radius).slice(0,e.maxTargets).forEach(t=>this.damageUnit(t,e.damage,`baneling`)),n.dead=!0,this.events.push({type:`acidBurst`,x:n.x,z:n.z,hostile:!0})}else if(e)this.damageUnit(e,n.kind===`hydralisk`?_e.hydralisk.contactDamage:_e.zergling.damage,n.kind),n.dead=!0;else if(n.z>zl.z){n.dead=!0,this.escaped++;let e=zl.leak[n.kind]??1;this.line=Math.max(0,this.line-e),this.leakDamage+=e,this.events.push({type:`leak`,kind:n.kind,x:n.x,z:n.z,cost:e,line:this.lineRatio})}}}this.spines=this.spines.filter(n=>{if(n.remaining-=e,n.remaining>0)return!0;let r=t.find(e=>e.id===n.targetId&&e.hp>0);return r&&Math.hypot(r.x-n.tx,r.z-n.tz)<1&&this.damageUnit(r,n.damage,n.source??`hydralisk`),!1}),this.modules.stim&&(this.stimTimer-=e)<=0&&(this.stimTimer=sr.stim.every,this.stimUntil=this.time+sr.stim.duration,this.equipmentTriggers.stim++,this.events.push({type:`stim`,x:this.x,z:this.frontZ+1.5}));let r=this.time<this.stimUntil?sr.stim.rate:1,i=this.time<this.volleySurgeUntil?Ln.surge.rate:1,a=this.overdrive>0?2:1,o=this.damageScale;this.enemyGrid.rebuild(this.enemies),this.gridReady=!0,this.frontRifleZ=1/0;for(let e of this.marines)e.hp>0&&nu(e)&&e.z<this.frontRifleZ&&(this.frontRifleZ=e.z);se(this,e),this.updateEquipment(e,o),this.heroic.has(`marine`)&&((this.volleyTimer-=e)<=0&&(this.volleyTimer+=Ln.every,this.volleyLeft=Ln.rounds,this.volleyNext=0,this.volleySurgeUntil=this.time+Ln.rounds*Ln.spacing+Ln.surge.duration),this.volleyLeft>0&&(this.volleyNext-=e)<=0&&(this.volleyNext+=Ln.spacing,this.volleyFire(o,this.volleyLeft--===Ln.rounds)));let s=n.platingRegen*(this.modules.plating??0)*e;for(let t of this.marines){if(s&&t.kind===`firebat`&&t.hp>0&&(t.hp=Math.min(t.maxHp,t.hp+s*t.maxHp)),t.hp<=0||(t.cooldown-=e)>0)continue;let c=this.pickMarineTarget(t),l=o*(t.damageMult??1)*gl(this,t,`damage`),u=(t.rateMult??1)*gl(this,t,`rate`);if(!c){t.cooldown=.04;continue}t.yaw=Math.atan2(t.x-c.target.x,t.z-c.target.z),t.recoil=1,this.shotsFired++;let d=eu(t).weapon;if(d===`plasma`){ys(this,t,c,l,a*this.rateScale*u);continue}if(d===`blade`){bs(this,t,c,l,a*this.rateScale*u);continue}if(d===`psionic`){xs(this,t,c,l,a*this.rateScale*u);continue}if(d===`lineflame`){Ws(this,t,c,l,a*this.rateScale*u);continue}if(tu(t)){t.attackAnimation=t.attackDuration;let e=q[t.kind],i=t.kind===`firebat`?this.modules.flame??0:0,o=t.kind===`firebat`?this.modules.incinerator??0:0;t.cooldown=e.cooldown/a/r/this.rateScale/u;let s=c.target.x,d=c.target.z,f=[-.65,.65].map(e=>({x:t.x+e*Math.cos(t.yaw)-1.15*Math.sin(t.yaw),y:1.45,z:t.z-e*Math.sin(t.yaw)-1.15*Math.cos(t.yaw)})),p=e.range+n.flameRange*i,m=(e.halfAngle+n.flameHalfAngle*i)*Math.PI/180;this.events.push({type:`flame`,x:t.x,z:t.z,muzzles:f,tx:s,tz:d,range:p,halfAngle:m,nozzle:this.modules.flame??0}),this.modules.napalm&&this.addBurnZone(s,d,K(t,`napalm`));let h=Math.hypot(s-t.x,d-t.z)||1;for(let r of this.nearbyEnemies(t.x,t.z,p)){let i=Math.hypot(r.x-t.x,r.z-t.z),a=((r.x-t.x)*(s-t.x)+(r.z-t.z)*(d-t.z))/(Math.max(.01,i)*h);!r.dead&&i<p&&a>Math.cos(m)&&this.damageEnemy(r,e.damage*l*Kt(t.kind,r)*(1+n.incinerator*o),!0,K(t,`flame`))}let g=this.boss;if(g&&!g.dead){let r=Math.hypot(g.x-t.x,g.z-t.z),i=((g.x-t.x)*(s-t.x)+(g.z-t.z)*(d-t.z))/(Math.max(.01,r)*h);r<p&&i>Math.cos(m)&&this.damageBoss(e.bossDamage*l*(1+n.incinerator*o),K(t,`flame`))}let _=this.pod;if(_?.state===`landed`){let r=Math.hypot(_.x-t.x,_.z-t.z),i=((_.x-t.x)*(s-t.x)+(_.z-t.z)*(d-t.z))/(Math.max(.01,r)*h);r<p&&i>Math.cos(m)&&this.damagePod(e.damage*l*(1+n.incinerator*o))}}else{if(t.cooldown=(q.marine.cooldown+this.random()*q.marine.jitter)/a/r/i/this.rateScale/(1+n.cadence*(this.modules.cadence??0))/u,t.hero){if(t.cooldown*=Ze[t.kind].cooldown,t.volleyShots=(t.volleyShots??0)+1,this.fireHeroLine(t,c,l),this.modules.salvo&&t.volleyShots%sr.salvo.every===0){let e=this.pickMarineTarget(t);e&&!e.pod&&(this.fireHeroLine(t,e,l*this.synergyScale(`piercing-volley`),`salvo`),this.equipmentTriggers.salvo++)}continue}if(c.pod){this.fireAtPod(t,l);continue}if(t.volleyShots=(t.volleyShots??0)+1,this.fireRifle(t,c,l),this.modules.salvo&&t.volleyShots%sr.salvo.every===0){let e=this.pickMarineTarget(t);e?.pod?this.fireAtPod(t,l):e&&(this.fireRifle(t,e,l*this.synergyScale(`piercing-volley`),.18),this.equipmentTriggers.salvo++)}}}for(let t of this.tanks){if(t.hp<=0||(t.cooldown-=e)>0)continue;let r=o*(t.damageMult??1);if(t.kind===`reaver`){Cs(this,t,r,a);continue}let i=this.enemies.filter(e=>!e.dead&&e.z>q.tank.targetMinZ&&e.z<q.tank.targetMaxZ&&t.z-e.z>q.tank.deadZone),s=e=>-Math.abs(e.z-q.tank.focusZ)-Math.abs(e.x-this.x)*.65+(e.kind===`baneling`?.75:0),c=i.reduce((e,t)=>!e||s(t)>s(e)?t:e,null);if(this.boss&&!this.boss.dead&&this.boss.z>-12&&(c=this.boss),!c){t.cooldown=.08;continue}t.yaw=Math.atan2(t.x-c.x,t.z-c.z),t.recoil=1,t.attackAnimation=t.attackDuration=.4,t.cooldown=q.tank.cooldown/(a>1?1.4:1)/this.rateScale/(1+n.reload*(this.modules.reload??0))/(t.rateMult??1);let l=q.tank.radius+n.shells*(this.modules.shells??0),u=t.scale??1,d=Kl.ahead*u;this.events.push({type:`shell`,x:t.x-d*Math.sin(t.yaw),z:t.z-d*Math.cos(t.yaw),y:Kl.height*u,tx:c.x,tz:c.z,radius:l});for(let e of this.splashTargets(c.x,c.z,l,q.tank.maxTargets+n.payload*(this.modules.payload??0)))this.damageEnemy(e,q.tank.damage*r*(Kt(`tank`,e)+(e.attributes?.includes(`armored`)?n.maelstrom*(this.modules.maelstrom??0):0)),!0,K(t,`shell`));if(this.boss&&!this.boss.dead&&Math.hypot(this.boss.x-c.x,this.boss.z-c.z)<Gl&&this.damageBoss(q.tank.bossDamage*r+q.tank.damage*r*n.maelstrom*(this.modules.maelstrom??0),K(t,`shell`)),(this.formedSynergies.has(`napalm-shelling`)||this.formedSynergies.has(`pyro-shelling`))&&this.addBurnZone(c.x,c.z,K(t,`napalm`)),this.formedSynergies.has(`psi-grid`)&&c!==this.boss&&Sc(this,c.x,c.z),this.modules.cluster){this.equipmentTriggers.cluster++;let e=l+sr.cluster.ringOffset;sr.cluster.angles.forEach((n,r)=>this.secondaryBlasts.push({x:c.x+Math.cos(n)*e,z:c.z+Math.sin(n)*e,source:K(t,`cluster`),delay:sr.cluster.firstDelay+r*sr.cluster.delayStep}))}if(this.heroic.has(`tank`)){let e=n.maelstrom*(this.modules.maelstrom??0);this.secondaryBlasts.push({x:c.x,z:c.z,source:K(t,`aftershock`,0),delay:$t.delay,aftershock:!0,damage:q.tank.damage*r*$t.damage,maelstrom:e,radius:l*$t.radius,maxTargets:Math.round((q.tank.maxTargets+n.payload*(this.modules.payload??0))*$t.targets),bossDamage:(q.tank.bossDamage+q.tank.damage*e)*r*$t.damage}),this.equipmentTriggers.aftershock++}}zs(this,e,o),ec(this,e,o),Tc(this,e,su),this.gridReady=!1,Qs(this),this.enemies=this.enemies.filter(e=>!e.dead),this.marines=this.marines.filter(e=>e.hp>0),this.tanks=this.tanks.filter(e=>e.hp>0);for(let e of this.supports)e.hp<=0&&!e.merc&&this.lostSupports.add(e.kind);this.supports=this.supports.filter(e=>e.hp>0),this.refreshGateOptions(),this.sandbox?this.line=zl.hp:!this.allies.length||this.line<=0?this.finish(`defeat`):!this.endless&&this.time>=No&&this.finish(this.boss?.dead?`victory`:`defeat`),this.pendingLevelUps>0&&this.state===`playing`&&!this.sandbox&&this.levelUpClear()&&this.openLevelUp()}enterSandbox(){this.sandbox=!0,this.tampered=!0,this.interactiveLevelUps=!1,this.pendingLevelUps=0,this.nextWave=this.nextHerald=Uo.length,this.activeWaves=[],this.nextRush=1/0,this.rush=null,this.nextGate=Fo.length,this.gate=null,this.bossSpawned=!0,this.spawnDebt=0}levelUpClear(){return!this.interactiveLevelUps||(this.levelHeldSince??=this.time,(this.gate&&!this.gate.claimed||this.time-this.lastGateAt<Rl.after)&&this.time-this.levelHeldSince<Rl.hold?!1:(this.levelHeldSince=null,!0))}splashTargets(e,t,n,r){let i=[];for(let r of this.nearbyEnemies(e,t,n)){if(r.dead)continue;let a=Math.hypot(r.x-e,r.z-t);a<n&&i.push([a,r])}return i.length>r&&(i.sort((e,t)=>e[0]-t[0]).length=r),i.map(e=>e[1])}fireHeroLine(e,t,r,i=`rifle`){let a=Ze[e.kind],o=K(e,i),s={...a,reach:a.reach+n.pierceReach*(this.piercing??0),halfWidth:a.halfWidth+ql*(this.piercing??0)},c=e.x+.27*Math.cos(e.yaw)-.9*Math.sin(e.yaw),l=e.z-.27*Math.sin(e.yaw)-.9*Math.cos(e.yaw),u=t.target.x-c,d=t.target.z-l,f=Math.hypot(u,d)||1,p=u/f,m=d/f;this.events.push({type:`heroLine`,x:c,z:l,tx:c+p*s.reach,tz:l+m*s.reach,level:this.weaponLevel,volley:i===`volleyfire`});let h=e=>{let t=e.x-c,n=e.z-l,r=t*p+n*m;return r>0&&r<s.reach&&Math.abs(t*m-n*p)<s.halfWidth+(e.radius??0)},g=this.enemies.filter(e=>!e.dead&&h(e));for(let e of g)this.damageEnemy(e,q.marine.damage*r*s.damage,!1,o);if(this.modules.shrapnel){let t=K(e,`shrapnel`),n=this.shrapnelRadius;for(let e of g.sort((e,t)=>t.z-e.z).slice(0,1+(this.piercing??0))){this.equipmentTriggers.shrapnel++,this.events.push({type:`shrapnel`,x:e.x,z:e.z,radius:n,presentationDelay:0});for(let i of this.nearbyEnemies(e.x,e.z,n))!i.dead&&Math.hypot(i.x-e.x,i.z-e.z)<n&&this.damageEnemy(i,sr.shrapnel.damage*r,!1,t)}}this.boss&&!this.boss.dead&&(t.boss||h(this.boss))&&this.damageBoss(q.marine.bossDamage*r*s.damage*3,o),this.pod?.state===`landed`&&(t.pod||h({x:this.pod.x,z:this.pod.z,radius:1}))&&this.damagePod(q.marine.damage*r*s.damage)}volleyFire(e,t=!0){let n=0;for(let t of this.marines){if(t.hp<=0||!nu(t))continue;let r=this.pickMarineTarget(t);if(!r||r.pod)continue;let i=e*(t.damageMult??1)*Ln.damage;t.yaw=Math.atan2(t.x-r.target.x,t.z-r.target.z),t.recoil=1,n++,t.hero?this.fireHeroLine(t,r,i,`volleyfire`):this.fireRifle(t,r,i,0,`volleyfire`,Math.max(this.piercing,Ln.pierce))}n&&(this.shotsFired+=n,t&&(this.equipmentTriggers.volleyfire++,this.events.push({type:`volleyfire`,x:this.x,z:this.frontZ,count:n})))}fireAtPod(e,t){let n=this.pod,r=e.x+.27*Math.cos(e.yaw)-.9*Math.sin(e.yaw),i=e.z-.27*Math.sin(e.yaw)-.9*Math.cos(e.yaw);this.events.push({type:`shot`,x:r,z:i,tx:n.x+(this.random()-.5)*1.4,tz:n.z+(this.random()-.5)*.8,piercing:0,salvo:!1,level:this.weaponLevel}),this.damagePod(q.marine.damage*t)}fireRifle(e,t,n,r=0,i=null,a=this.piercing){let o=K(e,i??(r?`salvo`:`rifle`),zn.rifle),s=i===`volleyfire`,c=!s||this.volleyRounds++%Math.round(1/Ln.tracerShare)===0,l=e.x+.27*Math.cos(e.yaw)-.9*Math.sin(e.yaw),u=e.z-.27*Math.sin(e.yaw)-.9*Math.cos(e.yaw),d=t.target.x-l,f=t.target.z-u,p=Math.hypot(d,f)||1,m=a?Math.max(p,Math.min(p+this.pierceReach,q.marine.range)):p,h=m;this.events.push({type:`shot`,x:l+r,z:u,tx:l+d/p*h,tz:u+f/p*h,piercing:a,salvo:!!r,level:this.weaponLevel,...s&&{volley:s,tracer:c}});let g=[t.target];if(a&&!t.boss){let e=this.pierceScratch;e.length=0;for(let n of this.enemies){if(n.dead||n===t.target)continue;let r=n.x-l,i=n.z-u,o=(r*d+i*f)/p;if(!(o>p&&o<m&&Math.abs(r*f-i*d)/p<q.marine.pierceHalfWidth))continue;let s=e.length;for(;s>0&&e[s-1].z<n.z;)s--;s>=a||(e.splice(s,0,n),e.length>a&&(e.length=a))}for(let t of e)g.push(t)}for(let t of g){if(t.dead)continue;let r={...o,presentationDelay:o.presentationDelay*Math.min(1,Math.hypot(t.x-l,t.z-u)/h)};if(t===this.boss?this.damageBoss(q.marine.bossDamage*n,r):this.damageEnemy(t,q.marine.damage*n,!1,r),!this.modules.shrapnel)continue;this.equipmentTriggers.shrapnel++;let i=this.shrapnelRadius;this.events.push({type:`shrapnel`,x:t.x,z:t.z,radius:i,presentationDelay:r.presentationDelay});let a=K(e,`shrapnel`,r.presentationDelay);for(let e of this.nearbyEnemies(t.x,t.z,i))!e.dead&&Math.hypot(e.x-t.x,e.z-t.z)<i&&this.damageEnemy(e,sr.shrapnel.damage*n,!1,a);this.boss&&!this.boss.dead&&Math.hypot(this.boss.x-t.x,this.boss.z-t.z)<i&&this.damageBoss(sr.shrapnel.damage*n,a)}}addBurnZone(e,t,n=null){let r=this.burnDuration,i=this.burnZones.find(n=>!n.spawned&&Math.hypot(n.x-e,n.z-t)<sr.napalm.mergeDistance);i?i.remaining=r:this.burnZones.reduce((e,t)=>e+ +!t.spawned,0)<sr.napalm.maxZones&&(this.burnZones.push({x:e,z:t,source:n,remaining:r}),this.equipmentTriggers.napalm++)}addWildfire(e,t,n){if(!this.heroic.has(`firebat`))return;let r=0;for(let e of this.burnZones)e.spawned&&r++;r>=jn.maxZones&&this.burnZones.splice(this.burnZones.findIndex(e=>e.spawned),1);let i=n?{...n,weapon:`wildfire`,presentationDelay:0}:null;this.burnZones.push({x:e,z:t,source:i,remaining:jn.duration,radius:jn.radius,spawned:!0}),this.equipmentTriggers.wildfire++}addVoidZone(e,t,n=null){let r=q.immortal.barrage.radius;this.voidZones.push({x:e,z:t,radius:r,source:n,until:this.time+Mt.duration}),this.voidZones.length>Mt.max&&this.voidZones.shift(),this.events.push({type:`voidZone`,x:e,z:t,radius:r,duration:Mt.duration})}addRimeZones(e,t,n,r,i,a){let o=Math.abs(t-n),s=r*1.2,c=Math.max(1,Math.round(o/s));for(let n=0;n<c;n++)this.rimeZones.push({x:e,z:t-(n+.5)*(o/c),radius:r,slow:i,until:this.time+a});this.rimeZones.length>48&&this.rimeZones.splice(0,this.rimeZones.length-48)}enemySpeed(e){let t=(e.thermalSlowUntil??-1/0)>this.time?e.thermalSlow:0,n=this.storms.length>0&&this.heroic.has(`templar`);if(!n&&!this.voidZones.length&&!this.rimeZones.length)return t?e.speed*(1-t):e.speed;if(n){for(let n of this.storms)if(Math.hypot(e.x-n.x,e.z-n.z)<n.radius){t=Math.max(t,U.slow);break}}for(let n of this.voidZones)if(Math.hypot(e.x-n.x,e.z-n.z)<n.radius){t=Math.max(t,Mt.slow);break}for(let n of this.rimeZones)n.slow>t&&Math.hypot(e.x-n.x,e.z-n.z)<n.radius&&(t=n.slow);return t?e.speed*(1-t):e.speed}updateEquipment(e,t){if(this.burnZones=this.burnZones.filter(t=>(t.z+=su*e,(t.remaining-=e)>0)),this.burnTick-=e,this.burnTick<=0){this.burnTick=sr.napalm.interval;let e=this.heroic.has(`firebat`),n=0;for(let r of this.enemies){let i=!r.dead&&this.burnZones.find(e=>Math.hypot(r.x-e.x,r.z-e.z)<(e.radius??sr.napalm.radius));i&&(this.damageEnemy(r,sr.napalm.damage*t*(i.spawned?jn.damage:1),!0,i.source),e&&r.dead&&!i.spawned&&n<jn.perTick&&(this.addWildfire(r.x,r.z,i.source),n++))}let r=this.boss&&!this.boss.dead&&this.burnZones.find(e=>Math.hypot(this.boss.x-e.x,this.boss.z-e.z)<(e.spawned?e.radius:sr.napalm.bossRadius));r&&this.damageBoss(sr.napalm.bossDamage*t*(r.spawned?jn.damage:1),r.source);for(let e of this.burnZones)e.spawned||this.events.push({type:`burn`,x:e.x,z:e.z})}let n=this.synergyScale(`cluster-barrage`);this.secondaryBlasts=this.secondaryBlasts.filter(r=>{if(r.aftershock&&(r.z+=su*e),(r.delay-=e)>0)return!0;if(r.aftershock){this.events.push({type:`aftershock`,x:r.x,z:r.z,radius:r.radius});for(let e of this.splashTargets(r.x,r.z,r.radius,r.maxTargets))this.damageEnemy(e,r.damage*(Kt(`tank`,e)+(e.attributes?.includes(`armored`)?r.maelstrom:0)),!0,r.source);return this.boss&&!this.boss.dead&&Math.hypot(this.boss.x-r.x,this.boss.z-r.z)<Gl&&this.damageBoss(r.bossDamage,r.source),!1}this.events.push({type:`cluster`,x:r.x,z:r.z});for(let e of this.splashTargets(r.x,r.z,sr.cluster.radius,sr.cluster.maxTargets))this.damageEnemy(e,sr.cluster.damage*n*t,!0,r.source);return this.boss&&!this.boss.dead&&Math.hypot(this.boss.x-r.x,this.boss.z-r.z)<sr.cluster.bossRadius&&this.damageBoss(sr.cluster.bossDamage*n*t,r.source),!1}),this.rimeZones.length&&(this.rimeZones=this.rimeZones.filter(t=>(t.z+=su*e,t.until>this.time))),this.updateVoidZones(e,t)}updateVoidZones(e,t){if(this.voidZones.length&&(this.voidZones=this.voidZones.filter(t=>(t.z+=su*e,t.until>this.time))),this.sunders.length&&(this.sunders=this.sunders.filter(t=>(t.z+=su*e,t.until>this.time))),!this.voidZones.length){this.voidTick=0;return}if((this.voidTick-=e)>0)return;this.voidTick+=Mt.tick;let n=Mt.dps*Mt.tick*t;for(let e of this.enemies){let t=!e.dead&&this.voidZones.find(t=>Math.hypot(e.x-t.x,e.z-t.z)<t.radius);t&&this.damageEnemy(e,n,!0,t.source)}let r=this.boss&&!this.boss.dead&&this.voidZones.find(e=>Math.hypot(this.boss.x-e.x,this.boss.z-e.z)<e.radius);r&&this.damageBoss(Mt.bossDps*Mt.tick*t,r.source)}drainEvents(){let e=this.events;return this.events=[],e}rosterSnapshot(){let e=Object.fromEntries(Object.keys(lu).map(e=>[e,0]));for(let t of this.allies)e[t.kind]++;return e}hudSnapshot(){return{roster:this.rosterSnapshot(),killRate:+(this.recentKills/3).toFixed(1),line:this.lineRatio,swarm:qo(this.time,this.activeWaves[0]??null),research:b(this)}}snapshot(){let e=this.rosterSnapshot();return{combat:this.report.snapshot(),pet:ee(this.pet),state:this.state,time:+this.time.toFixed(2),x:+this.x.toFixed(2),health:+this.health.toFixed(1),roster:e,marines:this.marines.length,tanks:this.tanks.length,enemies:this.enemies.length,peakEnemies:this.peakEnemies,enemyRoster:Object.fromEntries([`zergling`,`hydralisk`,`baneling`,`roach`,`aberration`].map(e=>[e,this.enemies.filter(t=>t.kind===e).length])),spawnedBanelings:this.spawnedBanelings,synergies:Ut(this).map(e=>e.id),synergyHistory:[...this.synergyHistory],heroic:[...this.heroic],heroNames:Object.fromEntries([...this.heroic].map(e=>[e,this.heroNames(e)])),heroRoll:Object.fromEntries([...this.heroic].map(e=>[e,this.heroRoll(e)])),voidZones:this.voidZones.length,mutators:[...this.mutators],revived:this.revived,spawnedHydralisks:this.spawnedHydralisks,spawnedRoaches:this.spawnedRoaches,spawnedAberrations:this.spawnedAberrations,spinesFired:this.spinesFired,wavesStarted:this.nextWave,kills:this.kills,losses:this.losses,escaped:this.escaped,line:this.line,leakDamage:this.leakDamage,combo:this.combo,bestCombo:this.bestCombo,overdrive:this.overdrive,overdrives:this.overdrives,killRate:+(this.recentKills/3).toFixed(1),peakKillRate:+this.peakKillRate.toFixed(1),swarm:qo(this.time),weaponLevel:this.weaponLevel,piercing:this.piercing,modules:{...this.modules},general:{...this.general},focusKind:this.focusKind,research:b(this),researchHistory:[...this.researchHistory],xp:Math.round(this.xp),level:this.researchLevel,rerolls:this.rerolls,levelUp:this.levelUp?{level:this.levelUp.level,options:this.levelUp.options.map(e=>e.id),rerolls:this.levelUp.rerolls,...this.levelUp.daelaam?{daelaam:this.levelUp.daelaam}:{},...this.levelUp.vanguard?{vanguard:this.levelUp.vanguard}:{}}:null,daelaam:this.daelaam?{stage:this.daelaam.stage,choice:this.daelaam.choice}:null,vanguard:this.vanguard?{stage:this.vanguard.stage,choice:this.vanguard.choice}:null,thermalSweeps:this.supports.filter(e=>e.sweep).map(e=>({id:e.id,x:e.sweep.previousX,z:e.sweep.z,reverse:e.sweep.reverse,width:e.sweep.stats.sweepWidth,muzzles:e.beamMuzzles?.map(e=>({x:e.x,y:e.y,z:e.z}))})),equipmentTriggers:{...this.equipmentTriggers},growthHistory:[...this.growthHistory],damageScale:this.damageScale,upgrades:[...this.upgrades],bossHp:this.boss?.hp??null,endless:this.endless?{layer:this.endless.layer,damageBoost:this.endless.damageBoost,rateBoost:this.endless.rateBoost,bosses:this.endless.bosses,nextLayerIn:Math.max(0,this.endless.nextLayerAt-this.time)}:null,nextGateIn:this.nextGate<Fo.length?Math.max(0,Fo[this.nextGate]-this.time):null,gate:this.gate?{index:this.gate.index,z:this.gate.z,claimed:this.gate.claimed,options:this.gate.options.map(e=>e.id)}:null}}},fu=[`marine`,`firebat`,`tank`,`thor`,`immortal`,`colossus`,`templar`];function pu(e){let t=Eo[e]??Do,n=t.army.filter(e=>e!==t.hero);return t.passives?.includes(`laserdrill`)&&n.push(`laserdrill`),n}var mu=e=>yt[e]?Object.keys(xn).find(t=>xn[t]===yt[e].id)??null:null;Object.fromEntries(fu.map(e=>[e,mu(e)]));var hu=3,gu=e=>(e*7%21-10)/10*hu,_u={zergling:(e,t)=>e.spawnEnemy(-8-t%10*.9,gu(t)),baneling:(e,t)=>e.spawnBaneling(-8-t%6*.9,gu(t)),hydralisk:(e,t)=>e.spawnHydralisk(-8-t%5*1.2,gu(t)),roach:(e,t)=>e.spawnRoach(-8-t%5*1.3,gu(t)),aberration:(e,t)=>e.spawnAberration(-9-t%3*2,gu(t)*.6)},vu={zergling:100,baneling:40,hydralisk:20,roach:15,aberration:3},yu=4400,bu=(e,t,n)=>{e.tampered=!0;let r=Math.max(0,Math.min(G[t].cap,n));t===`piercing`?e.piercing=r:t===`weapon`?e.weaponLevel=r+1:e.modules[t]=r},xu=e=>Object.keys(G).filter(t=>e===`laserdrill`?G[t].needs===`laserDrill`:G[t].requires===e);function Su(e,t){for(let n of xu(t))bu(e,n,G[n].cap);e.refreshSynergies()}function Cu(e,t){if(!yt[t])throw Error(`No heroic tier for ${t}`);let n=xu(t);for(let t of n)bu(e,t,Math.max(1,w(e,t)));let r=n.filter(e=>G[e].cap>1).sort((e,t)=>G[t].cap-G[e].cap)[0];bu(e,r,G[r].cap),e.refreshSynergies()}function wu(e,t){for(let n of xu(t))bu(e,n,0);for(let n of At)n.units.includes(t)&&(e.formedSynergies.delete(n.id),e.announcedSynergies.delete(n.id));e.heroic.delete(t),e.refreshSynergies()}function Tu(e,t,n=1){e.tampered=!0;for(let r=0;r<n;r++){if(t===`laserdrill`)return;t===`archon`?e.addArchon(e.x,11):$l[t]?e.addMarines($l[t].supply>1?2:4,t):t===`tank`||t===`reaver`?e.addTank(t):e.addSupport(t,{force:!0})}}function Eu(e,t){for(let n of t.units)e.allies.some(e=>e.kind===n)||Tu(e,n);for(let[n,r]of Object.entries(t.requires))bu(e,n,Math.max(r,w(e,n)));e.refreshSynergies()}function Du(e,t,n=vu[t]){if(e.tampered=!0,!_u[t])throw Error(`Unknown enemy pack: ${t}`);for(let r=0;r<n;r++)_u[t](e,r)}function Ou(e,t=yu){e.tampered=!0,e.bossSpawned=!0,e.boss={x:0,z:-6,hp:t,maxHp:t,hit:0,dead:!1,phase:0,attack:1.3}}function ku(e,t=null,n=fu){let r={};for(let i of n){let n=e.report.units[i]??{damage:0,kills:0,equipment:{}},a=mu(i),o={damage:n.damage,kills:n.kills,tier:a?n.equipment?.[a]??0:0,triggers:yt[i]?e.equipmentTriggers[yt[i].id]??0:0};r[i]=t&&t[i]?{damage:o.damage-t[i].damage,kills:o.kills-t[i].kills,tier:o.tier-t[i].tier,triggers:o.triggers-t[i].triggers}:o}return r.time=t?e.time-t.time:e.time,r}var Au=[0,.25,.5,1],ju=[null,`raynor`,`artanis`,`swann`];function Mu(e,{onSpeed:t,onReset:n,onCommander:r=null,scenario:i=null}){let a=()=>pu(e.commander),o=document.createElement(`aside`);o.id=`sandbox`,o.className=`sandbox`,document.body.appendChild(o);let s=1,c=!0,l=null,u=[],d=()=>{l=ku(e,null,a()),u=[]},f=[`zergling`,`baneling`,`hydralisk`,`roach`,`aberration`],p=[`none`,`max`,`heroic`],m={"arena.matchup.rifles":{squad:{marine:3},enemy:{zergling:120},cards:`max`},"arena.matchup.armor":{squad:{tank:2},enemy:{roach:20},cards:`max`},"arena.matchup.flame":{squad:{firebat:3},enemy:{zergling:150,baneling:20},cards:`max`},"arena.matchup.support":{squad:{thor:1,immortal:1,colossus:1,templar:1},enemy:{roach:25,aberration:4},cards:`heroic`},"arena.matchup.boss":{squad:{marine:6,tank:2},enemy:{},boss:!0,cards:`heroic`}},h={artanis:{"arena.matchup.protossLine":{squad:{dragoon:3,zealot:2,reaver:1},enemy:{zergling:150,hydralisk:10},cards:`max`},"arena.matchup.protossHeavy":{squad:{carrier:1,tempest:1,darktemplar:1,phoenix:1},enemy:{roach:25,aberration:4},cards:`heroic`},"arena.matchup.boss":{squad:{dragoon:4,tempest:1,reaver:1},enemy:{},boss:!0,cards:`heroic`}},swann:{"arena.matchup.mechLine":{squad:{hellion:3,hellbat:2,tank:1},enemy:{zergling:150,baneling:20},cards:`max`},"arena.matchup.mechHeavy":{squad:{goliath:1,cyclone:1,sciencevessel:1,thor:1},enemy:{roach:25,aberration:4},cards:`heroic`},"arena.matchup.boss":{squad:{hellion:4,cyclone:1,tank:1},enemy:{},boss:!0,cards:`heroic`}}},g=()=>h[e.commander]??m,_={squad:{marine:3},enemy:{zergling:120},cards:`none`,layer:0,boss:!1,fight:null,result:null},v=(e,t)=>_[e][t]??0,y=(e,t,n)=>{let r=Math.max(0,v(e,t)+n);r?_[e][t]=r:delete _[e][t]};function b(){for(let t of e.enemies)t.dead=!0;e.boss=null,e.marines=[],e.tanks=[],e.supports=[];for(let t of a())wu(e,t);e.endless=_.layer?{layer:_.layer,damageBoost:0,rateBoost:0,bosses:0,queue:[],nextLayerAt:1/0,nextGateAt:1/0,startedAt:e.time}:null;for(let[t,n]of Object.entries(_.squad))Tu(e,t,n);for(let t of Object.keys(_.squad))_.cards===`max`?Su(e,t):_.cards===`heroic`&&yt[t]&&Cu(e,t);e.updateFormation(1),_.boss&&Ou(e,yu);for(let[t,n]of Object.entries(_.enemy))Du(e,t,n);_.fight={at:e.time,mark:ku(e,null,a()),taken:e.damageTaken,losses:e.losses,squad:e.allies.length,enemies:e.enemies.length},_.result=null,d(),s=1,t(1),T()}function x(){if(!_.fight||_.result)return!1;let n=e.enemies.filter(e=>!e.dead).length+(e.boss&&!e.boss.dead?1:0),r=e.allies.filter(e=>e.hp>0).length;if(n&&r)return!1;let i=ku(e,_.fight.mark,a());return _.result={seconds:e.time-_.fight.at,allies:r,enemies:n,squad:_.fight.squad,swarm:_.fight.enemies,dealt:a().reduce((e,t)=>e+i[t].damage,0),taken:e.damageTaken-_.fight.taken,losses:e.losses-_.fight.losses},s=0,t(0),c=!0,!0}function S(){let e=(e,t,n)=>`<div class="arena-side"><span>${n}</span>${t.map(t=>`<button data-arena="${e}" data-kind="${t}" class="${v(e,t)?`on`:``}">${e===`squad`?Me[t]:I(`unit.${t}`)}${v(e,t)?` ${v(e,t)}`:``}</button>`).join(``)}</div>`,t=_.result?`<p class="arena-result">${I(_.result.allies?`arena.won`:`arena.lost`,{seconds:_.result.seconds.toFixed(1),allies:_.result.allies,squad:_.result.squad,enemies:_.result.enemies,swarm:_.result.swarm,dealt:Math.round(_.result.dealt),taken:Math.round(_.result.taken)})}</p>`:_.fight?`<p class="arena-result">${I(`arena.fighting`)}</p>`:``;return`<section class="arena">
      <header><strong>${I(`arena.title`)}</strong>${Object.keys(g()).map(e=>`<button data-matchup="${e}">${I(e)}</button>`).join(``)}</header>
      ${e(`squad`,a().filter(e=>e!==`laserdrill`),I(`arena.squad`))}
      ${e(`enemy`,f,I(`arena.enemy`))}
      <div class="arena-row"><span>${I(`arena.cards`)}</span>${p.map(e=>`<button data-cards="${e}" class="${_.cards===e?`on`:``}">${I(`arena.cards.${e}`)}</button>`).join(``)}
        <button data-arena-boss class="${_.boss?`on`:``}">${I(`unit.ultralisk`)}</button></div>
      <div class="arena-row"><span>${I(`arena.layer`)}</span><button data-layer="-1">−</button><b>${_.layer}</b><button data-layer="1">+</button>
        <button data-fight class="arena-fight">${I(`arena.fight`)}</button></div>
      ${t}
      <p class="sandbox-note">${I(`arena.note`)}</p>
    </section>`}function C(){if(!l)return``;let t=ku(e,null,a());for(u.push(t);u.length>2&&t.time-u[0].time>5;)u.shift();let n=u[0],r=Math.max(.001,t.time-n.time),i=a().map(i=>{if(!n[i]||!l[i])return``;let a=(t[i].damage-n[i].damage)/r,o=t[i].damage-l[i].damage;if(!o&&!a)return``;let s=t[i].tier-l[i].tier,c=t[i].triggers-l[i].triggers,u=e.heroic.has(i)?e.heroNames(i).join(`, `):``;return`<tr><td>${Me[i]}${u?` <em>${u}</em>`:``}</td><td>${Math.round(a)}</td><td>${Math.round(o)}</td><td>${s?`${Math.round(s)} / ${c}`:c||`-`}</td></tr>`}).join(``);return`<table class="sandbox-meter"><thead><tr><th>${I(`sandbox.line`)}</th><th>${I(`sandbox.dps`)}</th><th>${I(`sandbox.total`)}</th><th>${I(`sandbox.tierDamage`)}</th></tr></thead><tbody>${i}</tbody></table>`}function T(){let t=a().map(t=>{let n=xu(t).map(t=>{let n=w(e,t),r=G[t];return`<div class="sandbox-card${n?` on`:``}" title="${r.name}"><img src="${wt(t)}" alt=""><span>${r.short}</span>
          <button data-card="${t}" data-step="-1" ${n?``:`disabled`}>−</button><b>${r.equipment&&r.cap===1?n?`●`:`○`:Wn[n]}</b><button data-card="${t}" data-step="1" ${n<r.cap?``:`disabled`}>+</button></div>`}).join(``),r=e.heroic.has(t),i=yt[t]?`<button data-heroic="${t}" class="${r?`on`:``}">${I(r?`sandbox.heroicOn`:`sandbox.heroic`)}</button>`:``;return`<section class="sandbox-line"><header><strong>${Me[t]}</strong>${t===`laserdrill`?``:`<button data-add="${t}">${I(`sandbox.add`)}</button>`}
        <button data-max="${t}">${I(`sandbox.max`)}</button>${i}
        <button data-clear="${t}">${I(`sandbox.clearCards`)}</button></header><div class="sandbox-cards">${n}</div></section>`}).join(``),n=e.weaponLevel-1,i=r?`<div class="sandbox-row"><span>${I(`sandbox.commander`)}</span>${ju.map(t=>`<button data-commander="${t??``}" class="${(e.commander??null)===t?`on`:``}">${I(`commander.${t??`none`}`)}</button>`).join(``)}</div>`:``,l=At.filter(e=>e.joint&&e.units.every(e=>a().includes(e))),u=l.length?`<div class="sandbox-row"><span>${I(`sandbox.joint`)}</span>${l.map(t=>`<button data-joint="${t.id}" class="${e.formedSynergies.has(t.id)?`on`:``}">${t.name}</button>`).join(``)}</div>`:``;o.innerHTML=`<header class="sandbox-head"><strong>${I(`sandbox.title`)}</strong><button data-toggle>${I(c?`sandbox.hide`:`sandbox.show`)}</button></header>
      <div class="sandbox-body"${c?``:` hidden`}>
        ${i}
        ${S()}
        <div class="sandbox-row"><span>${I(`sandbox.speed`)}</span>${Au.map(e=>`<button data-speed="${e}" class="${e===s?`on`:``}">${e?`${e}x`:I(`sandbox.pause`)}</button>`).join(``)}</div>
        <div class="sandbox-row"><span>${I(`sandbox.swarm`)}</span>${Object.keys(_u).map(e=>`<button data-pack="${e}">+${vu[e]} ${I(`unit.${e}`)}</button>`).join(``)}
          <button data-boss>${I(`unit.ultralisk`)}</button><button data-trickle class="${e.sandboxTrickle?`on`:``}">${I(`sandbox.trickle`)}</button><button data-clear-enemies>${I(`sandbox.clearEnemies`)}</button></div>
        <div class="sandbox-row"><span>${I(`sandbox.meter`)} <small>${I(`sandbox.meterWindow`,{seconds:5})}</small></span><button data-meter>${I(`sandbox.meterReset`)}</button><div id="sandbox-meter" class="sandbox-meter-slot">${C()}</div></div>
        <div class="sandbox-row"><span>${G.weapon.name}</span><button data-card="weapon" data-step="-1" ${n?``:`disabled`}>−</button><b>${Wn[n]}</b><button data-card="weapon" data-step="1" ${n<G.weapon.cap?``:`disabled`}>+</button>
          <button data-clear-units>${I(`sandbox.clearUnits`)}</button><button data-reset>${I(`sandbox.reset`)}</button></div>
        ${u}
        ${t}
        <p class="sandbox-note">${I(`sandbox.note`)}</p>
      </div>`}if(o.addEventListener(`click`,i=>{let a=i.target.closest(`button`);if(!a)return;let o=a.dataset;if(`toggle`in o)c=!c;else if(o.arena)y(o.arena,o.kind,i.shiftKey?-1:1);else if(o.commander!==void 0)r(o.commander||null),s=1,t(1),d(),Object.assign(_,{squad:{},enemy:{},fight:null,result:null});else if(o.joint){let t=At.find(e=>e.id===o.joint);if(e.formedSynergies.has(t.id)){e.formedSynergies.delete(t.id),e.announcedSynergies.delete(t.id);for(let n of Object.keys(t.requires))bu(e,n,0)}else Eu(e,t)}else if(o.matchup){let e=g()[o.matchup];Object.assign(_,{squad:{...e.squad},enemy:{...e.enemy},cards:e.cards,boss:!!e.boss}),b();return}else if(o.cards)_.cards=o.cards;else if(`arenaBoss`in o)_.boss=!_.boss;else if(o.layer)_.layer=Math.max(0,Math.min(15,_.layer+Number(o.layer)));else if(`fight`in o){b();return}else if(o.speed!==void 0)s=Number(o.speed),t(s);else if(o.card)bu(e,o.card,w(e,o.card)+Number(o.step));else if(o.add)Tu(e,o.add);else if(o.max)Su(e,o.max);else if(o.heroic)e.heroic.has(o.heroic)?e.heroic.delete(o.heroic):(e.allies.some(e=>e.kind===o.heroic)||Tu(e,o.heroic),Cu(e,o.heroic));else if(o.clear)wu(e,o.clear);else if(o.pack)Du(e,o.pack);else if(`boss`in o)Ou(e,yu),e.events.push({type:`boss`,text:I(`event.boss`)});else if(`trickle`in o)e.sandboxTrickle=e.sandboxTrickle?0:25;else if(`clearEnemies`in o){for(let t of e.enemies)t.dead=!0;e.boss=null}else`clearUnits`in o?(e.marines=[],e.tanks=[],e.supports=[]):`reset`in o?(n(),s=1,t(1),d()):`meter`in o&&d();e.refreshSynergies(),T(),a.blur()}),d(),i){let{trickle:t,...n}=i;Object.assign(_,n),t&&(e.sandboxTrickle=t),b()}else T();return setInterval(()=>{if(x()){T();return}let e=o.querySelector(`#sandbox-meter`);e&&(e.innerHTML=C())},500),{render:T,resetMeter:d,get speed(){return s}}}function Nu(e){if(e.tampered=!0,!e.pet){xe(e);return}let t=r[e.pet.stage+1];t&&e.pet.alive&&(e.pet.growth=t.growth,e.pet.stageAt=-1/0,T(e))}var Pu=/^(localhost|127\.\d+\.\d+\.\d+|\[?::1\]?|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)$/,Fu=()=>Pu.test(location.hostname),Iu={sandbox:{label:`dev.sandbox`,apply:(e,t)=>{e.enterSandbox(),t.openPanel()}},tools:{label:`dev.tools`,apply:(e,t)=>t.openPanel()},squad:{label:`dev.squad`,apply:e=>{let t=e.roster;Tu(e,t.mainKind,6),Tu(e,t.frontKind,2),Tu(e,t.artilleryKind,2);for(let n of pu(e.commander))[t.mainKind,t.frontKind,t.artilleryKind].includes(n)||Tu(e,n);for(let t of Object.keys(G))bu(e,t,G[t].cap);e.refreshSynergies()}},boss:{label:`dev.boss`,apply:e=>{Iu.squad.apply(e),Ou(e,yu),e.events.push({type:`boss`,text:I(`event.boss`)})}},pet:{label:`dev.pet`,apply:e=>{e.pet||Nu(e)}},endless:{label:`dev.endless`,apply:(e,t)=>{Iu.squad.apply(e),e.state=`victory`,t.continueEndless()}},daelaam:{label:`dev.daelaam`,apply:(e,t)=>{Iu.endless.apply(e,t),e.endless.layer=yl.layer-1,e.endless.nextLayerAt=e.time+3}},vanguard:{label:`dev.vanguard`,apply:(e,t)=>{Iu.endless.apply(e,t),e.endless.layer=bl.layer-1,e.endless.nextLayerAt=e.time+3}}};function Lu({battle:e,start:t,continueEndless:n,onSpeed:r,onCommander:i=null}){let a=null,o={continueEndless:n,openPanel(){if(a){document.getElementById(`sandbox`)?.classList.remove(`hidden`);return}a=Mu(e,{onSpeed:r,onReset:()=>t(),onCommander:i})}},s=n=>{t(),Iu[n].apply(e,o)},c=document.createElement(`div`);c.className=`dev-presets`,new URLSearchParams(location.search).has(`debug`)&&c.classList.add(`dev-forced`),c.innerHTML=`<span>${I(`dev.title`)}</span>${Object.entries(Iu).map(([e,t])=>`<button type="button" data-preset="${e}">${I(t.label)}</button>`).join(``)}`,c.addEventListener(`click`,e=>{let t=e.target.closest(`button`)?.dataset.preset;t&&(s(t),e.target.blur())}),document.querySelector(`.deployment-controls`)?.appendChild(c);let l=document.createElement(`div`);return l.className=`dev-strip`,l.innerHTML=`<button type="button" data-act="panel">${I(`dev.panel`)}</button>
    <button type="button" data-act="level">${I(`dev.level`)}</button>
    <button type="button" data-act="swarm">${I(`dev.swarm`)}</button>
    <button type="button" data-act="boss">${I(`dev.boss`)}</button>
    <button type="button" data-act="pet">${I(`dev.petNext`)}</button>
    <button type="button" data-act="slow">0.25x</button><button type="button" data-act="fast">1x</button>`,l.addEventListener(`click`,t=>{let n=t.target.closest(`button`)?.dataset.act;n&&(t.target.blur(),n===`panel`?o.openPanel():n===`level`?(e.tampered=!0,e.researchLevel++,e.pendingLevelUps++):n===`swarm`?Du(e,`zergling`,100):n===`boss`?Iu.boss.apply(e):n===`pet`?Nu(e):r(n===`slow`?.25:1))}),document.getElementById(`app`)?.appendChild(l),{update:()=>{l.hidden=![`playing`,`paused`,`levelup`].includes(e.state)}}}var Ru=[`raynor`],zu=[`artanis`],Bu=typeof location<`u`&&Fu()&&!new URLSearchParams(location.search).has(`live`),Vu={artanis:[`artanis`,`dragoon`,`zealot`,`reaver`,`carrier`,`tempest`,`darktemplar`,`phoenix`,`archon`,`purifierDragoon`,`taldarimReaver`,`goldenCarrier`,`interceptor`,`scarab`,`stasisCell`],swann:[`hellion`,`hellbat`,`goliath`,`cyclone`,`sciencevessel`,`ares`,`junkerHellion`,`covertTank`,`junkerThor`,`spidermine`,`laserdrill`]},Hu=()=>Bu?Object.keys(Vu).reduce((e,t)=>e.includes(t)?e:[...e,t],[...Ru]):Ru,Uu=()=>Object.entries(Vu).filter(([e])=>!Hu().includes(e)).flatMap(([,e])=>e).filter(e=>!(Gu()&&Ku.includes(e))),Wu=e=>Hu().includes(e),Gu=()=>Bu||!0,Ku=[`carrier`,`tempest`,`reaver`,`interceptor`,`scarab`],qu=/^(artanis|bombard|carrier|interceptor|orbital|reaver|scarab|tempest|warp)-/,Ju=()=>Object.fromEntries(Object.entries(Vu).map(([e,t])=>[e,t.filter(e=>!(Gu()&&Ku.includes(e)))])),Yu=()=>zu.filter(e=>!Wu(e)),Xu={artanis:/^(archon|artanis|bombard|carrier|darktemplar|dragoon|guardian|interceptor|lance|orbital|phoenix|reaver|scarab|stasis|tempest|warp|zealot)-/,swann:/^(ares|cyclone|drill|goliath|hellbat|hellion|hercules|matrix|mine|pulse|rebuild|sciencevessel|swann|vessel)-/},Zu=e=>!(Gu()&&qu.test(e))&&Object.entries(Xu).some(([t,n])=>!Wu(t)&&n.test(e));function Qu(){if(!Bu)for(let e=At.length-1;e>=0;e--)At[e].joint&&At.splice(e,1)}var $u=[{id:`private`,kills:0,chevrons:1},{id:`corporal`,kills:50,chevrons:2},{id:`sergeant`,kills:150,chevrons:3},{id:`staffSergeant`,kills:350,chevrons:3,rocker:!0},{id:`lieutenant`,kills:700,bars:1},{id:`captain`,kills:1200,bars:2},{id:`major`,kills:2e3,stars:1},{id:`colonel`,kills:3500,stars:2},{id:`general`,kills:6e3,stars:3},{id:`fieldMarshal`,kills:1e4,stars:4},{id:`swarmbane`,kills:16e3,stars:5},{id:`extinction`,kills:26e3,stars:5,mythic:!0},{id:`logisticsNightmare`,kills:42e3,stars:5,mythic:!0}];function ed(e){let t=0;for(let n=0;n<$u.length;n++)e>=$u[n].kills&&(t=n);let n=$u[t],r=$u[t+1]??null;return{...n,index:t,name:I(`rank.${n.id}`),next:r,progress:r?(e-n.kills)/(r.kills-n.kills):1}}var td=(e,t,n)=>`<polygon class="mark" points="${Array.from({length:10},(r,i)=>{let a=-Math.PI/2+i*Math.PI/5,o=i%2?n*.42:n;return`${(e+Math.cos(a)*o).toFixed(2)},${(t+Math.sin(a)*o).toFixed(2)}`}).join(` `)}"/>`,nd=e=>`<path class="mark" d="M9 ${e+7} L20 ${e} L31 ${e+7} L31 ${e+11} L20 ${e+4} L9 ${e+11} Z"/>`;function rd(e){let t=e.chevrons?`enlisted`:e.bars?`officer`:`star`,n=``;if(e.chevrons){let t=22-(e.chevrons+ +!!e.rocker)*3.6;for(let r=0;r<e.chevrons;r++)n+=nd(t+r*6.4);if(e.rocker){let r=t+e.chevrons*6.4+1;n+=`<path class="mark" d="M9 ${r} Q20 ${r+7} 31 ${r} L31 ${r+4} Q20 ${r+11} 9 ${r+4} Z"/>`}}else if(e.bars)n=(e.bars===1?[16]:[11,21]).map(e=>`<rect class="mark" x="${e}" y="11" width="8" height="21" rx="1"/><rect class="shine" x="${e+1.6}" y="13" width="1.6" height="17"/>`).join(``);else{let t=e.stars===1?8.5:e.stars===2?6.2:e.stars===3?5:4.2;n=(e.stars===1?[[20,22]]:e.stars===2?[[13.5,22],[26.5,22]]:e.stars===3?[[20,15.5],[12.5,26],[27.5,26]]:e.stars===4?[[14,15.5],[26,15.5],[14,27],[26,27]]:[[11,15],[20,15],[29,15],[15.5,26.5],[24.5,26.5]]).map(([e,n])=>td(e,n,t)).join(``)}return`<svg class="insignia ${t}${e.mythic?` mythic`:``}" viewBox="0 0 40 44" width="40" height="44" aria-hidden="true">
    <path class="plate" d="M4 4 H36 V26 C36 35 28 40 20 42 C12 40 4 35 4 26 Z"/>
    <path class="inner" d="M7.5 7.5 H32.5 V26 C32.5 32.5 26.5 36.5 20 38.3 C13.5 36.5 7.5 32.5 7.5 26 Z"/>${n}</svg>`}var id=[{id:`eve_who`,context:[`menu`,`armory`],expression:`warm`,zh:{question:`你是谁?`,answer:`我是 Eve, 你的副官. 有什么问题都可以问我.`},en:{question:`Who are you?`,answer:`I'm Eve, your adjutant. Ask me anything.`},source:``,source_locator:`character introduction`,release_gate:{},action:null},{id:`armory_entry`,context:[`menu`],expression:`neutral`,zh:{question:`哪里能看兵种介绍和升级效果?`,answer:`主菜单右上角的"军械库"可以查兵种介绍和升级效果.`},en:{question:`Where can I read about units and upgrades?`,answer:`Armory, at the top right of the main menu.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/index.html`,source_locator:`toolbar .library-link`,release_gate:{},action:{id:`open_armory`,target:`/assets.html`,contexts:[`menu`],label:{zh:`打开军械库`,en:`Open Armory`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`armory_not_loadout`,context:[`armory`],expression:`neutral`,zh:{question:`能在军械库里装备升级卡吗?`,answer:`不能, 军械库只用来查资料. 升级卡要在战斗中的选卡界面选择.`},en:{question:`Can I equip upgrades in the Armory?`,answer:`No, it's reference only. You pick upgrade cards during a run.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/armory.js`,source_locator:`createArmory; no upgrade selection handlers`,release_gate:{},action:null},{id:`armory_base_stats`,context:[`armory`,`paused`],expression:`neutral`,zh:{question:`为什么军械库和这局的数值不同?`,answer:`军械库显示开局基础数值, 不含本局的升级和等级加成. 暂停后点"查看部队", 可以查本局的部队和升级.`},en:{question:`Why do Armory stats differ from my run?`,answer:`The Armory shows starting stats, before upgrades and levels. For this run, pause and select Squad.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/armory.js`,source_locator:`createArmory levels=0, research=0; src/main.js squadView`,release_gate:{},action:{id:`open_squad`,target:`#squad-button`,contexts:[`paused`],label:{zh:`查看部队`,en:`Squad`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`armory_enemy`,context:[`armory`,`menu`],expression:`neutral`,zh:{question:`哪里能查虫子的弱点?`,answer:`在军械库里选中对应的虫子, 就能查看攻击方式和"推荐应对".`},en:{question:`Where can I look up the Zerg?`,answer:`Pick a Zerg unit in the Armory to see how it attacks and its Recommended counter.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/armory.js`,source_locator:`enemy dossier, counter-note`,release_gate:{},action:{id:`open_armory`,target:`/assets.html`,contexts:[`menu`],label:{zh:`打开军械库`,en:`Open Armory`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`formed_requirement`,context:[`armory`,`paused`],expression:`neutral`,zh:{question:`两张相关卡就能触发联动吗?`,answer:`不一定, 卡牌要达到要求的等级, 相关兵种也要在场. 联动成型后, 本局会一直保留.`},en:{question:`Do two related cards make a combo?`,answer:`Not always. The cards need the right levels and the units must be on the field. Once formed, a combo lasts the whole run.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`synergyProgress; comboFielded; persisted formedSynergies`,release_gate:{},action:null},{id:`combo_list`,context:[`armory`,`paused`],expression:`neutral`,zh:{question:`有哪些联动, 去哪查?`,answer:`军械库里点"科技树总览", 每个兵种的联动 (标着"成型") 和英雄级都列在那里.`},en:{question:`Which combos exist, and where do I look?`,answer:`In the Armory, open Tech tree. Every unit's combos and heroic tier are there.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`assets.html #tech-tree; src/progression.js combos`,release_gate:{synergyId:`piercing-volley`,joint:!1},action:null},{id:`heroic_requirement`,context:[`armory`,`paused`],expression:`neutral`,zh:{question:`英雄级怎么解锁?`,answer:`该兵种在当前部队中适用的升级卡, 每张至少一级; 其中一张可升多级的卡还要升满, 单级卡不算. 满足后本局自动解锁英雄级.`},en:{question:`How do I unlock a heroic tier?`,answer:`Take every card in that unit's line your squad can get, at least level 1, and max one multi-level card. One-level cards don't count for the max. Heroic tier then switches on for the run.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`heroicSteps; lineCards; ARMY_NEEDS`,release_gate:{},action:null},{id:`raynor_upgrades`,context:[`armory`,`menu`,`paused`],expression:`neutral`,zh:{question:`机枪兵升级对雷诺有效吗?`,answer:`有效, 雷诺使用机枪兵的升级卡, 也算满足这些卡的机枪兵条件.`},en:{question:`Do Marine upgrades work on Raynor?`,answer:`Yes. Raynor uses Marine upgrades and satisfies their Marine requirement.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`hasUnit; src/armory.js DERIVED.raynor`,release_gate:{offeredCommander:`raynor`},action:null},{id:`card_eligibility`,context:[`armory`,`paused`],expression:`neutral`,zh:{question:`为什么想要的升级卡没出现?`,answer:`对应兵种、等级和其他条件都满足后, 卡牌才会进入抽取范围, 满级卡不会再出现. 符合条件也不保证每次都能抽到.`},en:{question:`Why isn’t the upgrade I want appearing?`,answer:`A card only shows up once its unit and level requirements are met, and maxed cards stop showing. Even then, it's a draw.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`moduleAvailable`,release_gate:{},action:null},{id:`card_reroll`,context:[`menu`],expression:`neutral`,zh:{question:`升级卡不想要, 能重抽吗?`,answer:`能, 选卡时点"重抽", 电脑按 R. 开局有 1 次, 每击倒一只雷兽再加 1 次.`},en:{question:`Can I reroll the upgrade cards?`,answer:`Yes: Reroll on the card screen, or press R. You start with one, and each Ultralisk kill adds one.`},source:``,source_locator:`src/simulation.js rerolls; zh.js levelup.reroll`,release_gate:{},action:null},{id:`army_level`,context:[`paused`,`menu`],expression:`neutral`,zh:{question:`升级有什么用?`,answer:`击杀敌人攒经验, 每升一级选一张升级卡. 前 9 级每级还会提高全队基础伤害.`},en:{question:`What does leveling up do?`,answer:`Kills earn XP. Each level gives you a pick of upgrade cards, and the first 9 levels also raise the squad's base damage.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`researchState; killXp; src/locales/zh.js event.researchDetail`,release_gate:{},action:null},{id:`endless_level`,context:[`paused`,`debrief`],expression:`neutral`,zh:{question:`等级有上限吗?`,answer:`没有, 无尽模式里可以一直升级, 越往后每级要的经验越多.`},en:{question:`Is there a level cap?`,answer:`No. In Endless you keep leveling, and each level takes more XP.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/progression.js`,source_locator:`xpThreshold`,release_gate:{},action:null},{id:`move_controls`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`怎么移动部队?`,answer:`手机上左右拖动就能移动部队; 电脑用 A / D 或左右方向键.`},en:{question:`How do I move the squad?`,answer:`Drag left or right on a phone. A / D or the arrow keys on a keyboard.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`keydown handler; pointer drag handlers`,release_gate:{},action:null},{id:`auto_fire`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`开火键是哪一个?`,answer:`不用按键, 部队会自动开火. 你负责左右移动和选补给. 带雷诺时, 技能要自己放: 电脑按 Q W E R, 手机点技能图标.`},en:{question:`Which button fires?`,answer:`None. The squad fires on its own; you steer and pick supplies. Raynor's skills are manual: Q W E R, or tap the icons.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/locales/zh.js`,source_locator:`hud.autoFire; hud.playHint`,release_gate:{},action:null},{id:`pause_controls`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`怎么暂停?`,answer:`手机点右上角的暂停按钮 (Ⅱ), 电脑也可以按 Esc 或 P. 暂停后点"继续战斗"恢复.`},en:{question:`How do I pause?`,answer:`Tap Ⅱ at the top right, or press Esc or P. Resume battle picks it back up.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`pause; pauseView; keydown handler`,release_gate:{},action:null},{id:`squad_panel`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`怎么看这局的部队和升级?`,answer:`手机点右上角的"部队", 或暂停后点"查看部队". 电脑按 Tab 也会暂停并打开部队面板.`},en:{question:`How do I check my units and upgrades?`,answer:`Tap Squad at the top right on a phone, or press Tab on a keyboard. You can also pause and select Squad.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`toggleSquad; keydown Tab; squad-top-button`,release_gate:{},action:{id:`open_squad`,target:`#squad-button`,contexts:[`paused`],label:{zh:`查看部队`,en:`Squad`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`deploy`,context:[`menu`],expression:`neutral`,zh:{question:`准备好了, 怎么开始?`,answer:`在主菜单点"部署小队"开始, 电脑也可以按空格.`},en:{question:`How do I start a run?`,answer:`Select Deploy squad on the main menu. On a keyboard, Space works too.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`start-button; ready state Space handler`,release_gate:{},action:null},{id:`unlock_raynor`,context:[`menu`],expression:`neutral`,zh:{question:`雷诺和突变因子为什么锁着?`,answer:`用标准小队赢一局, 就能解锁雷诺和突变因子.`},en:{question:`Why are Raynor and mutators locked?`,answer:`Win a run with the Standard squad to unlock Raynor and mutators.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`unlocked; unlock; result won branch`,release_gate:{unlocked:!1,offeredCommander:`raynor`},action:null},{id:`upcoming_commander`,context:[`menu`],expression:`neutral`,zh:{question:`阿塔尼斯什么时候出?`,answer:`老板在联系了, 阿塔尼斯比较大牌.`},en:{question:`When is Artanis coming?`,answer:`The boss is on it. Artanis is a big name.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/release.js`,source_locator:`RELEASED_COMMANDERS; ANNOUNCED_COMMANDERS; upcomingCommanders`,release_gate:{upcomingCommander:`artanis`,offeredCommander:`raynor`,hideIfPreview:!0},action:null},{id:`mutator_location`,context:[`menu`],expression:`neutral`,zh:{question:`突变因子在哪里设置?`,answer:`在主菜单展开"突变因子", 选择要启用的项目; 先赢一局才能解锁.`},en:{question:`Where do I select mutators?`,answer:`Expand Mutators on the main menu and pick what you want. They unlock after your first win.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`renderMutators; index.html details.mission-mutators`,release_gate:{},action:{id:`reveal_mutators`,target:`details.mission-mutators`,contexts:[`menu`],label:{zh:`查看突变因子`,en:`Show mutators`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`mutator_activation`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`选了突变因子, 怎么没立刻生效?`,answer:`突变因子要等你拿到几张卡才启用, 补给和升级卡都算, 生效时会有提示.`},en:{question:`Why aren't my mutators active at the start?`,answer:`They switch on after you've taken a few cards, supplies and level-ups alike. You'll get a notice.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/simulation.js`,source_locator:`applyUpgrade upgrades.length >= mutatorOnset; mutatorStart`,release_gate:{},action:null},{id:`endless_entry`,context:[`menu`,`debrief`],expression:`neutral`,zh:{question:`过关后还能继续吗?`,answer:`胜利结算页点"继续深入", 就能带当前部队进入无尽模式. "再次部署"会另开一局.`},en:{question:`Can I keep going after winning?`,answer:`Press on from the victory screen takes your squad into Endless. Deploy again starts fresh.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`continueEndless; start calls battle.reset; result endless-button`,release_gate:{},action:null},{id:`endless_retreat`,context:[`paused`],expression:`neutral`,zh:{question:`无尽里想收工, 怎么办?`,answer:`先暂停, 再点"撤离并结算", 本局就会结束, 按当前成绩结算.`},en:{question:`How do I finish an Endless run?`,answer:`Pause, then Retreat and score. The run ends with your current result.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/simulation.js`,source_locator:`retreat; src/main.js pauseView`,release_gate:{endless:!0,state:`paused`},action:null},{id:`sound_settings`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`音量在哪里调?`,answer:`主菜单右上角的"声音"可以调音量或全部静音. 手机战斗中先暂停, 再切换声音开关.`},en:{question:`Where can I adjust the sound?`,answer:`Sound, at the top right of the main menu: volume or mute all. In a run on a phone, pause to toggle sound.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`showMix; pauseSettings; index.html sound-panel`,release_gate:{},action:{id:`open_sound`,target:`#sound-button`,contexts:[`menu`],label:{zh:`打开声音`,en:`Open Sound`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`quality_settings`,context:[`menu`,`paused`],expression:`neutral`,zh:{question:`卡顿时能降低画质吗?`,answer:`可以, 在右上角的"设置"里调低画质. 手机战斗中先暂停, 再点画质切换.`},en:{question:`Can I lower the graphics quality?`,answer:`Yes. Lower it in Settings at the top right. On a phone during a run, pause first, then tap the quality setting.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`setQuality; pause-quality listener; index.html quality-choices`,release_gate:{},action:{id:`open_settings`,target:`#settings-button`,contexts:[`menu`],label:{zh:`打开设置`,en:`Open Settings`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`language_settings`,context:[`menu`,`armory`],expression:`neutral`,zh:{question:`怎么切换中文和英文?`,answer:`点右上角的 EN 或 中文切换, 页面会刷新.`},en:{question:`How do I switch between Chinese and English?`,answer:`Select EN or 中文 at the top right. The page reloads.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/locale.js`,source_locator:`detectLocale URL priority; initLocale reload; index.html topbar data-lang-toggle`,release_gate:{},action:null},{id:`leaderboard`,context:[`menu`,`debrief`],expression:`neutral`,zh:{question:`排行榜在哪? 本机和全球有什么区别?`,answer:`主菜单最高歼敌记录旁有"排行榜". 本机榜显示这个浏览器保存的成绩, 全球榜收录符合上榜条件的无尽成绩.`},en:{question:`Where is the leaderboard, and how do its tabs differ?`,answer:`Next to your best score on the main menu. This device: scores from this browser. Global: qualifying Endless runs.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/main.js`,source_locator:`showBoard; local record; score/qualifies gate`,release_gate:{},action:{id:`open_leaderboard`,target:`#board-button`,contexts:[`menu`],label:{zh:`打开排行榜`,en:`Open leaderboard`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`feedback`,context:[`menu`,`debrief`],expression:`neutral`,zh:{question:`哪里可以给作者提建议?`,answer:`主菜单底部点"反馈", 或在结算页点"给作者留句话". 写好后点"发送".`},en:{question:`Where can I send feedback?`,answer:`Feedback at the bottom of the main menu, or Leave the author a note on the results screen.`},source:`https://github.com/AlexZhangji/starcraft-shooter-2026/blob/dfb8bc28860414c77730256ee1d1bf8c520afc2c/src/locales/zh.js`,source_locator:`feedback.open; feedback.debrief; index.html feedback modal`,release_gate:{},action:{id:`open_feedback`,target:`#feedback-open or #feedback-debrief`,contexts:[`menu`,`debrief`],label:{zh:`打开反馈`,en:`Open feedback`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}},{id:`merc_contract`,context:[`menu`],expression:`neutral`,zh:{question:`签了雇佣兵合同, 怎么没来人?`,answer:`签约后会落下一个空投舱, 集火把它打破才能接到部队. 让它漂过防线就没了.`},en:{question:`I signed a mercenary contract. Where are they?`,answer:`A drop pod lands after you sign. Shoot it open and they join you. Let it drift past the line and they're gone.`},source:``,source_locator:`zh.js merc.signed / merc.lost`,release_gate:{},action:null},{id:`defeat`,context:[`menu`],expression:`neutral`,zh:{question:`怎么算输?`,answer:`小队全灭, 桥面失守, 或者雷兽没打掉, 都算输.`},en:{question:`When do I lose?`,answer:`If your squad is wiped out, too many bugs get past the bridge, or the Ultralisk is still standing.`},source:``,source_locator:`src/main.js defeatReason`,release_gate:{},action:null},{id:`save_local`,context:[`menu`],expression:`neutral`,zh:{question:`换手机或浏览器, 记录怎么没了?`,answer:`进度存在当前浏览器里. 换手机, 换浏览器, 或者从 QQ, 微信里打开, 都是另一份记录.`},en:{question:`Why is my progress gone on another phone or browser?`,answer:`It's saved in this browser only. Another phone, another browser, or opening the game in QQ or WeChat means a separate record.`},source:``,source_locator:`localStorage only`,release_gate:{},action:null},{id:`endless_mutators`,context:[`menu`],expression:`neutral`,zh:{question:`没选突变因子, 怎么也出现了?`,answer:`无尽打到后面 (第 2, 5, 8 层), 会自动加上随机的突变因子, 没选也会出现.`},en:{question:`Why did a mutator show up when I didn't pick one?`,answer:`Deeper in Endless (layers 2, 5 and 8) a random mutator switches on by itself.`},source:``,source_locator:`src/endless.js mutatorLayers`,release_gate:{},action:null},{id:`supply_full`,context:[`menu`],expression:`neutral`,zh:{question:`补给箱怎么不给兵了?`,answer:`部队满了以后, 补给箱不再补兵, 改给全队强化.`},en:{question:`Why do supply crates stop giving units?`,answer:`Once your squad is full, crates stop sending troops and give the whole squad a boost instead.`},source:``,source_locator:`src/simulation.js full squad crate`,release_gate:{},action:null},{id:`window_pause`,context:[`menu`],expression:`neutral`,zh:{question:`切到别的窗口, 怎么就暂停了?`,answer:`战斗中切走窗口会自动暂停, 回来点"继续战斗"就行.`},en:{question:`Why does the game pause when I switch windows?`,answer:`Leaving the window pauses the battle. Come back and select Resume battle.`},source:``,source_locator:`src/main.js window blur`,release_gate:{},action:null},{id:`merc_odin`,context:[`menu`],expression:`neutral`,zh:{question:`奥丁怎么拿?`,answer:`奥丁是很少见的雇佣兵合同, 一局最多出现一次, 看运气.`},en:{question:`How do I get Odin?`,answer:`Odin is a rare mercenary contract: at most once a run, and down to luck.`},source:``,source_locator:`src/mercenary.js odin contractChance once`,release_gate:{},action:null},{id:`armor_types`,context:[`menu`],expression:`neutral`,zh:{question:`哪些虫子是重甲?`,answer:`蟑螂, 畸变体, 雷兽是重甲; 跳虫, 刺蛇是轻甲.`},en:{question:`Which Zerg are armored?`,answer:`Roaches, Aberrations and Ultralisks are armored; Zerglings and Hydralisks are light.`},source:``,source_locator:`src/combat-rules.js ENEMY_ATTRIBUTES`,release_gate:{},action:null},{id:`combo_progress`,context:[`menu`],expression:`neutral`,zh:{question:`战斗中怎么看联动还差几张?`,answer:`暂停后点"查看部队" (手机点右上角"部队", 电脑按 Tab), 每条兵种线都写着联动进度.`},en:{question:`How do I see how close a combo is mid-battle?`,answer:`Pause and select Squad (or tap Squad on a phone, Tab on a keyboard). Each unit line shows its combo progress.`},source:``,source_locator:`zh.js squad.techComboProgress`,release_gate:{},action:null},{id:`weapon_protoss`,context:[`menu`],expression:`neutral`,zh:{question:`武器校准对神族有用吗?`,answer:`有用, 武器校准加的是全队基础伤害, 神族也算.`},en:{question:`Does Weapon Calibration help Protoss units?`,answer:`Yes. It raises the whole squad's base damage, Protoss included.`},source:``,source_locator:`src/simulation.js damageScale`,release_gate:{},action:null},{id:`merc_upgrades`,context:[`menu`],expression:`neutral`,zh:{question:`雇佣兵吃升级卡和英雄级吗?`,answer:`吃. 雇佣兵和同种兵用同一套升级卡和英雄级, 比如雇佣兵坦克就吃坦克的.`},en:{question:`Do mercenaries get upgrade cards and heroic tiers?`,answer:`Yes. They share their unit's cards and heroic tier: a mercenary tank counts as a tank.`},source:``,source_locator:`src/simulation.js fieldMercenaries kind = base unit`,release_gate:{},action:null},{id:`share_report`,context:[`menu`],expression:`neutral`,zh:{question:`别人分享的战报图在哪弄?`,answer:`结算页点"分享战报", 里面能保存图片, 也能直接分享.`},en:{question:`Where do I get the battle report image people share?`,answer:`On the results screen, select Share battle report. Save the image or share it from there.`},source:``,source_locator:`index.html #share-button; main.js openShare`,release_gate:{},action:null},{id:`replay_save`,context:[`menu`],expression:`neutral`,zh:{question:`录像怎么保存?`,answer:`也在"分享战报"里. 电脑默认会录; 手机默认不录, 要先打开录像, 开了战斗会稍微慢一点.`},en:{question:`How do I save a replay?`,answer:`It's under Share battle report too. Computers record by default; phones don't, so turn recording on first. Fights run a little slower with it on.`},source:``,source_locator:`index.html #replay-block; zh.js replay.offPhone`,release_gate:{},action:null},{id:`phone_hot`,context:[`menu`],expression:`neutral`,zh:{question:`手机发烫怎么办?`,answer:`在右上角的"设置"里调低画质. 手机烫了不能放进冰箱.`},en:{question:`My phone is getting hot. What do I do?`,answer:`Lower the quality in Settings at the top right. And a hot phone does not go in the fridge.`},source:``,source_locator:`toolbar #settings-button quality`,release_gate:{},action:{id:`open_settings`,target:`#settings-button`,contexts:[`menu`],label:{zh:`打开设置`,en:`Open Settings`},guard:`Only show when the existing target is visible and usable; close help first; no gameplay mutation or form submission.`}}],ad={zh:{ask:`问 Eve`,rank:`副官`,title:`Eve · 副官`,close:`关闭`,all:`更多话题`,topics:`返回`,intro:`哪儿拿不准? 说来听听.`,updates:`这次更新了什么?`},en:{ask:`Ask Eve`,rank:`Adjutant`,title:`Eve · Adjutant`,close:`Close`,all:`More topics`,topics:`Back`,intro:`Something you are unsure about? Let’s hear it.`,updates:`What's new?`}},od=[{id:`controls`,home:!0,zh:`操作`,en:`Controls`,ids:[`move_controls`,`auto_fire`,`pause_controls`,`squad_panel`,`window_pause`,`deploy`]},{id:`cards`,home:!0,zh:`升级卡`,en:`Upgrade cards`,ids:[`card_eligibility`,`card_reroll`,`army_level`,`raynor_upgrades`,`merc_upgrades`,`weapon_protoss`]},{id:`combos`,home:!0,zh:`联动和英雄级`,en:`Combos and heroic tiers`,ids:[`formed_requirement`,`combo_list`,`combo_progress`,`heroic_requirement`]},{id:`battle`,zh:`战斗`,en:`Battle`,ids:[`defeat`,`armor_types`,`supply_full`,`merc_contract`,`merc_odin`]},{id:`endless`,zh:`无尽`,en:`Endless`,ids:[`endless_entry`,`endless_level`,`endless_mutators`,`endless_retreat`]},{id:`unlocks`,zh:`指挥官和突变因子`,en:`Commanders and mutators`,ids:[`upcoming_commander`,`unlock_raynor`,`mutator_location`,`mutator_activation`]},{id:`armory`,zh:`军械库`,en:`Armory`,ids:[`armory_entry`,`armory_not_loadout`,`armory_base_stats`,`armory_enemy`]},{id:`share`,zh:`分享和排行榜`,en:`Sharing and leaderboard`,ids:[`share_report`,`replay_save`,`leaderboard`]},{id:`settings`,zh:`设置和反馈`,en:`Settings and feedback`,ids:[`sound_settings`,`quality_settings`,`phone_hot`,`language_settings`,`save_local`,`feedback`]}],sd={dream:[[`手机热了……不能放冰箱……`,`A hot phone… doesn't go in the fridge…`],[`野水晶……找到了……`,`Found the proxy pylon…`],[`飞龙骑脸……怎么输……`,`Mutas in your face… how do you lose…`],[`需要建造……更多的水晶塔……`,`You must construct… additional pylons…`],[`Show me the money……`,`Show me the money…`],[`Something for nothing……`,`Something for nothing…`],[`暴雪说……2030年……呜……`,`Blizzard said… 2030… *sniff*…`],[`人口……又卡了……`,`Supply blocked… again…`],[`所有的虚空……都是幻象……`,`Void really is… a hallucination…`],[`五十块钱的……好兄弟……`,`My fifty-mineral… brothers…`]],greeting:[[`在呢.`,`I'm here.`],[`你问吧.`,`Ask away.`],[`通信正常.`,`Comms are clear.`],[`作为专业副官, 就是要敢于下判断.`,`As a professional adjutant, I make the bold calls.`],[`为什么提速叉会摔倒? 因为它不平衡.`,`Why do Chargelots keep falling over? They're imbalanced.`,`lively-open-mouth-laugh`]],wake:[[`……醒了. 刚才那段不计入战报.`,`…Awake. Leave that last bit out of the report.`],[`嗯, 在呢. 刚才只是闭眼侦察.`,`Yes, I’m here. Just scouting with my eyes closed.`],[`回来了. 你说, 我听着.`,`I’m back. Go ahead, I’m listening.`],[`好, 清醒了. 梦里的事就留在梦里吧.`,`All right, I’m awake. Let’s leave the dream where it was.`],[`刚才那句……当作通信杂音吧.`,`That last bit… let’s call it interference.`],[`醒了醒了. 没让你等太久吧?`,`Awake now. Haven’t kept you too long, have I?`],[`我在. 给我一秒, 好了.`,`I’m here. Give me a second. There we go.`],[`嗯, 回来了. 你刚才想说什么?`,`Mm. I’m back. What did you want to ask?`]],rareDream:[[`SlayerS……MMA……`,`SlayerS… MMA…`],[`李培楠夺冠了……`,`Oliveira won the championship…`]]},cd={zh:{skip:`叫醒她`,help:`直接问问题`,dreaming:`Eve 的梦话`,awake:`Eve 醒了`},en:{skip:`Wake her`,help:`Ask a question`,dreaming:`Eve is dreaming`,awake:`Eve is awake`}},ld=Object.freeze({show:!0,hints:!0,flavor:!0}),ud=Object.freeze({min:10,spread:15,yawn:2.2,dozy:2.8}),dd=(e=Math.random)=>ud.min+e()*ud.spread;function fd(e,t=!1,n=ud.min){return t||e<n?`attentive`:e>=n+ud.yawn+ud.dozy?`asleep`:e>=n+ud.yawn?`dozy`:`yawn`}var pd=Object.freeze({attentive:`classic-neutral-attentive`,welcome:`lively-friendly-wave`,happy:`lively-warm-open-smile`,yawn:`lively-yawn`,dozy:`lively-dozy-head-tip`,asleep:`lively-asleep-on-hands`,wake:`lively-freshly-awake`,startled:`classic-startled-awake`,sleepy:`classic-sleepy`,resting:`classic-asleep`}),md=Object.freeze({eve_who:`lively-friendly-wave`,save_local:`classic-focused-concern`,endless_mutators:`classic-explaining`,supply_full:`classic-explaining`,window_pause:`classic-neutral-attentive`,merc_odin:`classic-knowing-smile`,armor_types:`classic-thinking`,combo_progress:`classic-explaining`,weapon_protoss:`classic-knowing-smile`,merc_upgrades:`classic-knowing-smile`,share_report:`lively-warm-open-smile`,phone_hot:`classic-knowing-smile`,replay_save:`classic-explaining`,armory_entry:`classic-explaining`,armory_not_loadout:`classic-knowing-smile`,armory_base_stats:`classic-thinking`,armory_enemy:`classic-focused-concern`,formed_requirement:`classic-explaining`,combo_list:`classic-explaining`,card_reroll:`classic-knowing-smile`,merc_contract:`classic-explaining`,defeat:`classic-focused-concern`,heroic_requirement:`classic-explaining`,raynor_upgrades:`classic-knowing-smile`,card_eligibility:`classic-thinking`,army_level:`classic-explaining`,endless_level:`classic-explaining`,move_controls:`lively-friendly-wave`,auto_fire:`classic-knowing-smile`,pause_controls:`classic-neutral-attentive`,squad_panel:`classic-neutral-attentive`,deploy:`lively-warm-open-smile`,unlock_raynor:`classic-explaining`,upcoming_commander:`classic-knowing-smile`,mutator_location:`classic-explaining`,mutator_activation:`classic-focused-concern`,endless_entry:`lively-warm-open-smile`,endless_retreat:`classic-focused-concern`,sound_settings:`classic-neutral-attentive`,quality_settings:`classic-thinking`,language_settings:`classic-focused-concern`,leaderboard:`classic-explaining`,feedback:`lively-warm-open-smile`});function hd(e=`menu`,t=``){return e===`armory`?[`eve_who`,`armory_base_stats`,/baneling|zergling|hydralisk|roach|aberration|ultralisk/.test(t)?`armory_enemy`:`formed_requirement`]:[`eve_who`]}function gd(e,t,n=!0){return e===`armory`||!t&&n}function _d(e,t=Math.random){let n=[],r;return()=>{if(!n.length){n=e.map((e,t)=>t);for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}n.length>1&&n[n.length-1]===r&&([n[0],n[n.length-1]]=[n[n.length-1],n[0]])}return r=n.pop(),e[r]}}function vd(e,t,n=!1){return n?`ignore`:t&&[`yawn`,`dozy`,`asleep`].includes(e)?`dream`:`help`}function yd({now:e=Date.now,schedule:t=setTimeout,cancel:n=clearTimeout}={}){let r=null,i=0,a=0,o=null,s=()=>{r!==null&&n(r),r=null},c=()=>{o&&r===null&&(a=e()+i,r=t(()=>{r=null;let e=o;o=null,e()},i))};return{start(e,t){s(),i=e,o=t,c()},pause(){r!==null&&(i=Math.max(0,a-e())),s()},resume:c,clear(){s(),o=null,i=0}}}function bd(e=``){let t=(e.match(/[\u3400-\u9fff]/g)||[]).length,n=(e.replace(/[\u3400-\u9fff]/g,` `).match(/[A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*/g)||[]).length;return Math.min(8e3,Math.max(3e3,1200+t*220+n*260))}var xd=Object.fromEntries([`classic-01-neutral-attentive`,`classic-02-knowing-smile`,`classic-03-thinking`,`classic-04-idea`,`classic-05-explaining`,`classic-06-skeptical`,`classic-07-puffed-cheek`,`classic-08-sleepy`,`classic-09-asleep`,`classic-10-startled-awake`,`classic-11-quiet-triumph`,`classic-12-focused-concern`,`lively-01-warm-open-smile`,`lively-02-joyful-closed-eye-smile`,`lively-03-open-mouth-laugh`,`lively-04-stifled-giggle`,`lively-05-delighted-double-fists`,`lively-06-friendly-wave`,`lively-07-embarrassed-smile`,`lively-08-mischievous-grin`,`lively-09-yawn`,`lively-10-dozy-head-tip`,`lively-11-asleep-on-hands`,`lively-12-freshly-awake`,`lively-13-claw-swipe`].map(e=>[e.replace(/-\d\d-/,`-`),Ot(`/assets/ui/eve/${e}.webp`)]));function Sd(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Cd(e,t,n=``){let r=Sd(`button`,`eve-chip ${n}`.trim(),e);return r.type=`button`,r.addEventListener(`click`,t),r}function wd({context:e=`menu`,host:t,getSelection:n=()=>``,isUnlocked:r=()=>!1,beforeOpen:i=()=>{},isAvailable:a=()=>!0}={}){if(!t)return null;let o=We()===`en`?`en`:`zh`,s=ad[o],c=cd[o],l={...ld},u=null,d=Date.now(),f=dd(),p=`attentive`,m=null,h=null,g=`home`,_=0,v=0,y=0,b=null,x=new Set,S=Object.fromEntries(Object.entries(sd).map(([e,t])=>[e,_d(t)])),C=e=>S[e]()[+(o===`en`)],w=yd(),T=matchMedia(`(prefers-reduced-motion: reduce)`),E=matchMedia(`(max-width: 650px)`),D=matchMedia(`(max-width: 650px)`),O=document.getElementById(`app`),k=document.getElementById(`welcome`),A=document.getElementById(`loading`),j=()=>a()&&gd(e,O?.classList.contains(`playing`),!k?.classList.contains(`hidden`))&&(e===`armory`||!A||A.classList.contains(`hidden`)),M=Sd(`button`,`eve-head eve-${e}`);M.type=`button`,M.setAttribute(`aria-label`,`Eve ${s.rank}`),M.setAttribute(`aria-haspopup`,`dialog`),M.setAttribute(`aria-expanded`,`false`),M.setAttribute(`aria-controls`,`eve-help`);let N=Sd(`img`,`eve-portrait`);N.alt=``,N.decoding=`async`,N.width=160,N.height=160;let ee=Sd(`span`,`eve-z`,`z z`);ee.setAttribute(`aria-hidden`,`true`);let te=Sd(`span`,`eve-name`);te.insertAdjacentHTML(`afterbegin`,rd($u.find(e=>e.id===`lieutenant`))),te.append(Sd(`b`,``,`Eve`),Sd(`small`,``,s.rank)),M.append(Sd(`span`,`eve-glow`),N,ee,Sd(`span`,`eve-sweat`),te);let ne=()=>{e===`menu`?(D.matches?t:O||t).append(M):t.append(M)};ne(),D.addEventListener(`change`,ne);let re=Sd(`div`,`eve-backdrop`);re.hidden=!0;let P=Sd(`div`,`eve-panel`);P.id=`eve-help`,P.hidden=!0,P.setAttribute(`role`,`dialog`),P.setAttribute(`aria-label`,s.title);let ie=Sd(`div`,`eve-choices`),F=Sd(`div`,`eve-say-row`),ae=Sd(`div`,`eve-say`),oe=Sd(`img`,`eve-face`);oe.alt=``;let se=Sd(`p`,`eve-say-q`),ce=Sd(`p`,`eve-say-text`);ce.setAttribute(`aria-live`,`polite`);let le=Sd(`button`,`eve-x`,`×`);le.type=`button`,le.setAttribute(`aria-label`,s.close);let ue=Sd(`div`,`eve-say-action`);ae.append(le,se,ce,ue);let I=Sd(`span`,`eve-face-wrap`);I.append(oe,Sd(`span`,`eve-sweat`)),F.append(ae,I),oe.addEventListener(`click`,()=>ge());let de=Sd(`div`,`eve-claw`);de.setAttribute(`aria-hidden`,`true`),de.append(Sd(`i`),Sd(`i`),Sd(`i`)),P.append(ie,F),document.body.append(re,P,de);function fe(e){let t=xd[l.flavor&&!T.matches?e:pd.attentive]||xd[pd.attentive];for(let e of[N,oe])e.getAttribute(`src`)!==t&&(e.src=t);M.dataset.state=p}let L=_d([pd.startled,`lively-stifled-giggle`,`lively-mischievous-grin`]),pe=0;function me(e,t){e.classList.remove(t),e.offsetWidth,e.classList.add(t)}function he(){let e=(E.matches?I:M).getBoundingClientRect(),t=Math.max(150,e.width*1.6);de.style.left=`${e.left+e.width/2-t/2}px`,de.style.top=`${e.top+e.height/2-t/2}px`,de.style.width=de.style.height=`${t}px`,me(de,`eve-scratching`),me(ae,`eve-shake`)}function ge(){if(!l.flavor||T.matches)return;let e=Date.now();v=e-y<3e3?v+1:1,y=e;let t=v>=15?`gone`:v>=11?`claw`:v>=7?`sweat`:v>=4?`pout`:`react`;for(let e of[M,I])e.dataset.mood=t,me(e,`eve-poked`);if(clearTimeout(b),t===`gone`){v=0,pe=e+3e3,Me(),fe(`classic-puffed-cheek`),b=setTimeout(()=>{delete M.dataset.mood,delete I.dataset.mood,h||(fe(pd.attentive),Ee())},3e3);return}fe(t===`react`?L():t===`sweat`?`classic-skeptical`:t===`claw`?`lively-claw-swipe`:`classic-puffed-cheek`),t===`claw`&&he(),b=setTimeout(()=>{delete M.dataset.mood,delete I.dataset.mood,h===`help`&&fe(m?md[m.id]:pd.welcome)},t===`react`?1400:3e3)}function _e(){let e=ie.scrollTop>2,t=ie.scrollTop+ie.clientHeight<ie.scrollHeight-2;ie.classList.toggle(`eve-fade-top`,e),ie.classList.toggle(`eve-fade-bottom`,t)}ie.addEventListener(`scroll`,_e,{passive:!0});function ve(){if(P.hidden)return;if(P.style.left=P.style.right=P.style.top=P.style.bottom=P.style.maxHeight=``,P.classList.toggle(`eve-sheet`,E.matches),E.matches){P.classList.add(`eve-from-right`),P.classList.remove(`eve-from-top`),_e();return}let e=M.getBoundingClientRect(),t=window.innerWidth,n=window.innerHeight,r=e.left>t-e.right,i=e.top+e.height/2<n/2;P.classList.toggle(`eve-from-right`,r),P.classList.toggle(`eve-from-top`,i),r?P.style.right=`${Math.max(10,t-e.left+10)}px`:P.style.left=`${Math.min(t-300,e.right+10)}px`,i?(P.style.top=`${Math.max(10,e.top)}px`,P.style.maxHeight=`${n-Math.max(10,e.top)-10}px`):(P.style.bottom=`${Math.max(10,n-e.bottom)}px`,P.style.maxHeight=`${e.bottom-20}px`),_e()}function ye(e){h=e,P.dataset.mode=h;let t=P.hidden;P.hidden=!1,re.hidden=!E.matches,M.setAttribute(`aria-expanded`,String(h===`help`)),M.classList.add(`eve-talking`),ve(),t&&P.animate?.([{opacity:0,transform:`translateY(6px)`},{opacity:1,transform:`none`}],{duration:T.matches?0:160,easing:`ease-out`})}function be(){if(!h&&P.hidden){w.clear();return}w.clear(),h=null,P.hidden=re.hidden=!0,g=`home`,M.setAttribute(`aria-expanded`,`false`),M.classList.remove(`eve-talking`)}function xe(e,t){se.textContent=e||``,se.hidden=!e,ce.textContent=t,ue.replaceChildren()}function Se({focus:e=!1}={}){be(),p=`attentive`,d=Date.now(),f=dd(),_=Date.now()+300,fe(pd.attentive),e&&j()&&l.show&&M.focus(),Ee()}function Ce(){h===`dream`&&(p=`wake`,fe(pd.wake),h=`wake`,P.dataset.mode=h,xe(``,C(`wake`)),ie.replaceChildren(Cd(c.help,()=>B())),ve(),w.start(bd(ce.textContent),()=>Se({focus:P.contains(document.activeElement)})))}function we(){i(),Te(),p=`asleep`,fe(pd.asleep),xe(``,C(Math.random()<.08?`rareDream`:`dream`)),ie.replaceChildren(Cd(c.skip,()=>{Ce(),M.focus()}),Cd(c.help,()=>B())),ye(`dream`),w.start(4500,Ce)}function Te(){clearTimeout(u),u=null}function Ee(){if(Te(),!j()||document.hidden||!l.show||!l.flavor||h)return;let e=(Date.now()-d)/1e3;p=fd(e,T.matches,f),fe(pd[p]);let t=[f,f+2.2,f+5].find(t=>t>e);t&&(u=setTimeout(Ee,Math.max(100,(t-e)*1e3)))}function R(e){if(h===`dream`||h===`wake`||M.contains(e?.target)||P.contains(e?.target))return;let t=[`dozy`,`asleep`,`yawn`].includes(p);d=Date.now(),f=dd(),!h&&j()&&(Te(),p=`attentive`,t&&l.flavor&&!T.matches?(fe(pd.wake),u=setTimeout(Ee,1600)):Ee())}function De(e){return!(e.id===`raynor_upgrades`&&!Wu(`raynor`)||e.id===`unlock_raynor`&&r()||e.id===`upcoming_commander`&&Ru.includes(`artanis`))}function Oe(){let t=id.filter(De),r=e=>t.find(t=>t.id===e),i=e=>Cd(e[o].question,()=>{x.add(e.id),je(e)}),a=e=>{g=e,Oe(),ve(),ie.scrollTop=0},c=e=>Cd(e[o],()=>a(e.id),`eve-topic`),u=od.filter(e=>e.ids.some(r)),d=Cd(s.topics,()=>a(`home`),`eve-more`),f;f=g===`more`?[...u.filter(e=>!e.home).map(c),d]:g===`home`?[...(l.hints?hd(e,n()):[]).map(r).filter(e=>e&&e!==m&&!x.has(e.id)).map(i),...z()?[Cd(s.updates,()=>{let e=z();Me(),e?.click()})]:[],...u.filter(e=>e.home).map(c),Cd(s.all,()=>a(`more`),`eve-more`)]:[...u.find(e=>e.id===g).ids.map(r).filter(e=>e&&e!==m).map(i),d],ie.replaceChildren(...f)}function z(){let t=e===`menu`&&document.getElementById(`updates-banner`);return t&&!t.hidden&&t.getClientRects().length?t:null}let ke={open_armory:`.library-link`,open_sound:`#sound-button`,open_settings:`#settings-button`,open_leaderboard:`#board-button`,open_feedback:`#feedback-open`};function Ae(t){if(e!==`menu`||!j()||!t.action?.contexts.includes(`menu`))return null;let n=ke[t.action.id];if(!n)return null;let r=document.querySelector(n);return r&&!r.disabled&&!r.hidden&&r.getClientRects().length?r:null}function je(e,{updateExpression:t=!0}={}){m=e,xe(e[o].question,e[o].answer),Ae(e)&&ue.append(Cd(e.action.label[o],()=>{let t=Ae(e);t&&(Me(),t.click())},`eve-go`)),Oe(),ve(),t&&fe(md[e.id])}function B(){if(!j())return;(h===`dream`||h===`wake`)&&w.clear(),i(),Te(),p=`attentive`;let e=l.flavor?S.greeting():null,t=e?e[+(o===`en`)]:s.intro;m?je(m,{updateExpression:!1}):(xe(``,t),Oe()),ye(`help`),fe(!m&&e?.[2]?e[2]:pd.welcome),(ie.querySelector(`button`)||le).focus({preventScroll:!0})}function Me(){if(h===`dream`||h===`wake`){Se();return}h&&(be(),j()&&l.show&&M.focus({preventScroll:!0}),d=Date.now(),f=dd(),p=`attentive`,fe(pd.attentive),Ee())}le.addEventListener(`click`,Me),re.addEventListener(`click`,Me),M.addEventListener(`click`,()=>{if(!j()||document.hidden||Date.now()<_||Date.now()<pe)return;if(h===`help`){ge();return}if(h===`dream`){Ce(),fe(pd.startled),clearTimeout(b),b=setTimeout(()=>{h===`wake`&&fe(pd.wake)},900);return}let e=vd(p,l.flavor,h===`dream`||h===`wake`);e===`dream`?we():e===`help`&&B()});let Ne=e=>{h&&!P.contains(e.target)&&!M.contains(e.target)&&Me()},V=e=>{h&&(e.stopImmediatePropagation(),e.key===`Escape`&&e.type===`keydown`&&(e.preventDefault(),Me()))};window.addEventListener(`keydown`,V,!0),window.addEventListener(`keyup`,V,!0),window.addEventListener(`pointerdown`,Ne,!0);let H=()=>ve();window.addEventListener(`resize`,H),window.addEventListener(`scroll`,H,!0);function Pe(){let e=[...document.querySelectorAll(`dialog[open], [role="dialog"]`)].some(e=>e!==P&&!e.hidden&&!e.classList.contains(`hidden`)&&e.getClientRects().length);(h===`dream`||h===`wake`)&&(!j()||!l.show||!l.flavor||e)&&Se(),(!l.flavor||T.matches)&&fe(pd.attentive);let t=j();M.hidden=!t||!l.show,(!t||!l.show&&h)&&be(),!t||document.hidden||!l.show?Te():Ee()}let Fe=new MutationObserver(Pe);for(let e of[O,k,A])e&&Fe.observe(e,{attributes:!0,attributeFilter:[`class`,`hidden`]});let Ie=new MutationObserver(Pe);Ie.observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[`open`]});for(let e of document.querySelectorAll(`[role="dialog"]`))e!==P&&Ie.observe(e,{attributes:!0,attributeFilter:[`class`,`hidden`]});let Le=()=>{document.hidden?(Te(),w.pause()):(d=Date.now(),f=dd(),(h===`dream`||h===`wake`)&&w.resume(),Pe())};document.addEventListener(`visibilitychange`,Le),window.addEventListener(`pointerdown`,R,{passive:!0}),window.addEventListener(`keydown`,R);let Re=()=>{R(),Pe()};T.addEventListener(`change`,Re);let ze=()=>{re.hidden=P.hidden||!E.matches,ve()};return E.addEventListener(`change`,ze),fe(pd.attentive),Pe(),{isOpen:()=>!!h,gamepad({close:e,move:t=0,activate:n=!1}){if(!h)return;if(e){Me();return}let r=[...P.querySelectorAll(`button,input`)].filter(e=>e.getClientRects().length&&!e.disabled);t&&r.length&&r[(r.indexOf(document.activeElement)+t+r.length)%r.length].focus(),n&&P.contains(document.activeElement)&&document.activeElement.click()},refresh:()=>{h===`help`&&Oe()},close:Me,destroy(){D.removeEventListener(`change`,ne),E.removeEventListener(`change`,ze),Te(),w.clear(),Ie.disconnect(),Fe.disconnect(),window.removeEventListener(`resize`,H),window.removeEventListener(`scroll`,H,!0),window.removeEventListener(`keydown`,V,!0),window.removeEventListener(`keyup`,V,!0),window.removeEventListener(`pointerdown`,Ne,!0),window.removeEventListener(`keydown`,R),window.removeEventListener(`pointerdown`,R),document.removeEventListener(`visibilitychange`,Le),T.removeEventListener(`change`,Re),clearTimeout(b),P.remove(),re.remove(),de.remove(),M.remove()}}}function Td(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Zn,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Ed(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Ed(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Ed(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new xt(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Dd(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Od(e){let t=new Map,n=new Map,r=e.clone();return kd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function kd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)kd(e.children[r],t.children[r],n)}var Ad=class extends nr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Id(e)}),this.register(function(e){return new Ld(e)}),this.register(function(e){return new Kd(e)}),this.register(function(e){return new qd(e)}),this.register(function(e){return new Jd(e)}),this.register(function(e){return new zd(e)}),this.register(function(e){return new Bd(e)}),this.register(function(e){return new Vd(e)}),this.register(function(e){return new Hd(e)}),this.register(function(e){return new Fd(e)}),this.register(function(e){return new Ud(e)}),this.register(function(e){return new Rd(e)}),this.register(function(e){return new Gd(e)}),this.register(function(e){return new Wd(e)}),this.register(function(e){return new Nd(e)}),this.register(function(e){return new Yd(e,$.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Yd(e,$.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Xd(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=St.extractUrlBase(e);a=St.resolveURL(t,this.path)}else a=St.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new j(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===Zd){try{a[$.KHR_BINARY_GLTF]=new ef(e)}catch(e){r&&r(e);return}i=JSON.parse(a[$.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Df(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case $.KHR_MATERIALS_UNLIT:a[t]=new Pd;break;case $.KHR_DRACO_MESH_COMPRESSION:a[t]=new tf(i,this.dracoLoader);break;case $.KHR_TEXTURE_TRANSFORM:a[t]=new nf;break;case $.KHR_MESH_QUANTIZATION:a[t]=new rf;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function jd(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Md(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var $={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},Nd=class{constructor(e){this.parser=e,this.name=$.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new S(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],ht);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new u(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new fe(s),o.distance=c;break;case`spot`:o=new Wt(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),yf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Pd=class{constructor(){this.name=$.KHR_MATERIALS_UNLIT}getMaterialType(){return rn}extendParams(e,t,n){let r=[];e.color=new S(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],ht),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,ce))}return Promise.all(r)}},Fd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Id=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new p(e,e)}return Promise.all(r)}},Ld=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Rd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},zd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SHEEN}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new S(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],ht)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,ce)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Bd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},Vd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_VOLUME}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new S().setRGB(i[0],i[1],i[2],ht),Promise.all(r)}},Hd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IOR}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},Ud=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new S().setRGB(i[0],i[1],i[2],ht),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,ce)),Promise.all(r)}},Wd=class{constructor(e){this.parser=e,this.name=$.EXT_MATERIALS_BUMP}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},Gd=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Md(this.parser,e,this.name)===null?null:we}extendMaterialParams(e,t){let n=Md(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},Kd=class{constructor(e){this.parser=e,this.name=$.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},qd=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Jd=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Yd=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},Xd=class{constructor(e){this.name=$.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==cf.TRIANGLES&&e.mode!==cf.TRIANGLE_STRIP&&e.mode!==cf.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new y,n=new J,a=new rt,s=new J(1,1,1),c=new _n(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Rn(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Zn,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Rn(t.array,t.itemSize,t.normalized))}d.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},Zd=`glTF`,Qd=12,$d={JSON:1313821514,BIN:5130562},ef=class{constructor(e){this.name=$.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Qd),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Zd)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-Qd,i=new DataView(e,Qd),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===$d.JSON){let r=new Uint8Array(e,Qd+a,t);this.content=n.decode(r)}else if(r===$d.BIN){let n=Qd+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},tf=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=$.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=pf[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=pf[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=lf[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,ht,n)})})}},nf=class{constructor(){this.name=$.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},rf=class{constructor(){this.name=$.KHR_MESH_QUANTIZATION}},af=class extends bn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},of=new rt,sf=class extends af{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return of.fromArray(i).normalize().toArray(i),i}},cf={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},lf={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uf={9728:ae,9729:mn,9984:Ie,9985:zt,9986:ge,9987:Ht},df={33071:Ve,33648:k,10497:Ye},ff={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},pf={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},mf={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},hf={CUBICSPLINE:void 0,LINEAR:Et,STEP:Pn},gf={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function _f(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new je({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function vf(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function yf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function bf(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function xf(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Sf(e){let t,n=e.extensions&&e.extensions[$.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Cf(n.attributes):e.indices+`:`+Cf(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Cf(e.targets[n]);return t}function Cf(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function wf(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Tf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Ef=new y,Df=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new jd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new Vn(this.options.manager):new Nt(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new j(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return vf(i,a,r),yf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(St.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=ff[r.type],t=lf[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new xt(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=ff[r.type],o=lf[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new qt(f,u/s),t.cache.add(n,c)),p=new vt(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new xt(f,a,d);if(r.sparse!==void 0){let t=ff.SCALAR,n=lf[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new xt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=uf[n.magFilter]||1006,t.minFilter=uf[n.minFilter]||1008,t.wrapS=df[n.wrapS]||1e3,t.wrapT=df[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new sn(e);t.needsUpdate=!0,n(t)}),t.load(St.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),yf(e,a),e.userData.mimeType=a.mimeType||Tf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[$.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[$.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[$.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new le,Jn.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new kt,Jn.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return je}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[$.KHR_MATERIALS_UNLIT]){let e=r[$.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new S(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],ht),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,ce)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||gf.OPAQUE;if(l===gf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===gf.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==rn&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new p(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==rn&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==rn){let e=i.emissiveFactor;o.emissive=new S().setRGB(e[0],e[1],e[2],ht)}return i.emissiveTexture!==void 0&&a!==rn&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,ce)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),yf(n,i),t.associations.set(n,{materials:e}),i.extensions&&vf(r,n,i),n})}createUniqueName(e){let t=st.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[$.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return kf(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Sf(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[$.KHR_DRACO_MESH_COMPRESSION]?i(o):kf(new Zn,o,t),o.mode===cf.TRIANGLE_STRIP?e=e.then(e=>Dd(e,1)):o.mode===cf.TRIANGLE_FAN&&(e=e.then(e=>Dd(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?_f(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===cf.TRIANGLES||u.mode===cf.TRIANGLE_STRIP||u.mode===cf.TRIANGLE_FAN||u.mode===void 0){let e=i.isSkinnedMesh===!0,t=l.hasAttribute(`skinIndex`)&&l.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),d=e&&t?new jt(l,f):new R(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights()}else if(u.mode===cf.LINES)d=new wn(l,f);else if(u.mode===cf.LINE_STRIP)d=new Un(l,f);else if(u.mode===cf.LINE_LOOP)d=new It(l,f);else if(u.mode===cf.POINTS)d=new On(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&xf(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),yf(d,i),u.extensions&&vf(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&vf(r,c[0],i),c[0];let l=new ut;i.extensions&&vf(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new Ke(He.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new ne(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yf(t,n),Promise.resolve(t)}loadSkin(t){let n=this.json.skins[t],r=[];for(let e=0,t=n.joints.length;e<t;e++)r.push(this._loadNodeShallow(n.joints[e]));return n.inverseBindMatrices===void 0?r.push(null):r.push(this.getDependency(`accessor`,n.inverseBindMatrices)),Promise.all(r).then(function(t){let r=t.pop(),i=t,a=[],o=[];for(let e=0,t=i.length;e<t;e++){let t=i[e];if(t){a.push(t);let n=new y;r!==null&&n.fromArray(r.array,e*16),o.push(n)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,n.joints[e])}return new e(a,o)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new pn(i,void 0,l);return yf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Ef)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new J().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new mt:t.length>1?new ut:t.length===1?t[0]:new d,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),yf(o,i),i.extensions&&vf(n,o,i),i.matrix!==void 0){let e=new y;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new ut;n.name&&(i.name=r.createUniqueName(n.name)),yf(i,n),n.extensions&&vf(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Od(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Jn||e instanceof sn)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}mf[i.path]===mf.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(mf[i.path]){case mf.weights:l=or;break;case mf.rotation:l=dt;break;case mf.translation:case mf.scale:l=x;break;default:switch(n.itemSize){case 1:l=or;break;default:l=x}}let u=r.interpolation===void 0?Et:hf[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+mf[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=wf(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof dt?sf:af)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Of(e,t,n){let r=t.attributes,i=new Gn;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new J(t[0],t[1],t[2]),new J(a[0],a[1],a[2])),e.normalized){let t=wf(lf[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new J,t=new J;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=wf(lf[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new In;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function kf(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=pf[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return v.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${v.workingColorSpace}" not supported.`),yf(e,t),Of(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:bf(e,t.targets,n)})}var Af=(function(){var e=`b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb`,t=`b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb`,n=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),r=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!=`object`)return{supported:!1};var i=WebAssembly.validate(n)?s(t):s(e),a,o=WebAssembly.instantiate(i,{}).then(function(e){a=e.instance,a.exports.__wasm_call_ctors()});function s(e){for(var t=new Uint8Array(e.length),n=0;n<e.length;++n){var i=e.charCodeAt(n);t[n]=i>96?i-97:i>64?i-39:i+4}for(var a=0,n=0;n<e.length;++n)t[a++]=t[n]<60?r[t[n]]:(t[n]-60)*64+t[++n];return t.buffer.slice(0,a)}function c(e,t,n,r,i,a,o){var s=e.exports.sbrk,c=r+3&-4,l=s(c*i),u=s(a.length),d=new Uint8Array(e.exports.memory.buffer);d.set(a,u);var f=t(l,r,i,u,a.length);if(f==0&&o&&o(l,c,i),n.set(d.subarray(l,l+r*i)),s(l-s(0)),f!=0)throw Error(`Malformed buffer data: `+f)}var l={NONE:``,OCTAHEDRAL:`meshopt_decodeFilterOct`,QUATERNION:`meshopt_decodeFilterQuat`,EXPONENTIAL:`meshopt_decodeFilterExp`,COLOR:`meshopt_decodeFilterColor`},u={ATTRIBUTES:`meshopt_decodeVertexBuffer`,TRIANGLES:`meshopt_decodeIndexBuffer`,INDICES:`meshopt_decodeIndexSequence`},d=[],f=0;function p(e){var t={object:new Worker(e),pending:0,requests:{}};return t.object.onmessage=function(e){var n=e.data;t.pending-=n.count,t.requests[n.id][n.action](n.value),delete t.requests[n.id]},t}function m(e){for(var t=`self.ready = WebAssembly.instantiate(new Uint8Array([`+new Uint8Array(i)+`]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = `+g.name+`;`+c.toString()+g.toString(),n=new Blob([t],{type:`text/javascript`}),r=URL.createObjectURL(n),a=d.length;a<e;++a)d[a]=p(r);for(var a=e;a<d.length;++a)d[a].object.postMessage({});d.length=e,URL.revokeObjectURL(r)}function h(e,t,n,r,i){for(var a=d[0],o=1;o<d.length;++o)d[o].pending<a.pending&&(a=d[o]);return new Promise(function(o,s){var c=new Uint8Array(n),l=++f;a.pending+=e,a.requests[l]={resolve:o,reject:s},a.object.postMessage({id:l,count:e,size:t,source:c,mode:r,filter:i},[c.buffer])})}function g(e){var t=e.data;self.ready.then(function(e){if(!t.id)return self.close();try{var n=new Uint8Array(t.count*t.size);c(e,e.exports[t.mode],n,t.count,t.size,t.source,e.exports[t.filter]),self.postMessage({id:t.id,count:t.count,action:`resolve`,value:n},[n.buffer])}catch(e){self.postMessage({id:t.id,count:t.count,action:`reject`,value:e})}})}return{ready:o,supported:!0,useWorkers:function(e){m(e)},decodeVertexBuffer:function(e,t,n,r,i){c(a,a.exports.meshopt_decodeVertexBuffer,e,t,n,r,a.exports[l[i]])},decodeIndexBuffer:function(e,t,n,r){c(a,a.exports.meshopt_decodeIndexBuffer,e,t,n,r)},decodeIndexSequence:function(e,t,n,r){c(a,a.exports.meshopt_decodeIndexSequence,e,t,n,r)},decodeGltfBuffer:function(e,t,n,r,i,o){c(a,a.exports[u[i]],e,t,n,r,a.exports[l[o]])},decodeGltfBufferAsync:function(e,t,n,r,i){return d.length>0?h(e,t,n,u[r],l[i]):o.then(function(){var o=new Uint8Array(e*t);return c(a,a.exports[u[r]],o,e,t,n,a.exports[l[i]]),o})}}})(),jf=e=>(e.textureLoader=new Vn(e.options.manager),e.textureLoader.setCrossOrigin(e.options.crossOrigin),{name:`image-element-decode`}),Mf=`bitmap`,Nf=({imageElements:e=Mf===`element`}={})=>{let t=new Ad().setMeshoptDecoder(Af);return e&&t.register(jf),t};function Pf(e){let t=new Set((e.parser.json.materials??[]).filter(e=>e.pbrMetallicRoughness?.baseColorTexture).map(e=>e.name)),n=new Set;return e.scene.traverse(e=>{for(let r of[e.material??[]].flat())t.has(r.name)&&!r.map&&n.add(r)}),[...n]}var Ff={width:650,cap:512,small:256},If=/\/(zergling-scr|zergling-scr-phone|marine-sc2|warpigs-sc2|raynor-sc2|firebat-sc2|hydralisk-classic|hydralisk-classic-phone|baneling-sc2|roach-sc2|zealot-sc2|dragoon-sc2|dragoon-purifier-sc2|hellion-sc2|hellion-junker-sc2|hellbat-sc2|darktemplar-sc2|spidermine-sc2|interceptor-sc2|scarab-sc2)\.glb/,Lf=!1,Rf=()=>{Lf=!0},zf=()=>Lf||typeof location<`u`&&new URLSearchParams(location.search).has(`notexcap`)&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname),Bf=(e,t=typeof window>`u`?1/0:window.innerWidth)=>t>=Ff.width||zf()?1/0:If.test(e)?Ff.small:Ff.cap,Vf=[`map`,`normalMap`,`emissiveMap`,`roughnessMap`,`metalnessMap`,`aoMap`,`alphaMap`,`specularMap`];function Hf(e,t,n){let r=typeof OffscreenCanvas<`u`?new OffscreenCanvas(t,n):Object.assign(document.createElement(`canvas`),{width:t,height:n}),i=r.getContext(`2d`);return i.imageSmoothingEnabled=!0,i.imageSmoothingQuality=`high`,i.drawImage(e,0,0,t,n),r}var Uf=3e3;async function Wf(e,t,n){let r,i=createImageBitmap(e,{resizeWidth:t,resizeHeight:n,resizeQuality:`high`,premultiplyAlpha:`none`,colorSpaceConversion:`none`}),a=new Promise((e,t)=>{r=setTimeout(()=>t(Error(`bitmap resize timed out`)),Uf)});try{return await Promise.race([i,a])}catch(e){throw i.then(e=>e?.close?.(),()=>{}),e}finally{clearTimeout(r)}}async function Gf(e,t){if(!Number.isFinite(t))return 0;let n=new Map;e.scene.traverse(e=>{for(let t of[e.material??[]].flat())for(let e of Vf){let r=t[e];r?.image&&n.set(r.source,r)}});let r=0;return await Promise.all([...n.values()].map(async e=>{let n=e.image,i=n.width,a=n.height,o=t/Math.max(i,a);if(!(o<1))return;let s=Math.max(1,Math.round(i*o)),c=Math.max(1,Math.round(a*o)),l=typeof ImageBitmap<`u`&&n instanceof ImageBitmap&&typeof createImageBitmap<`u`,u=null;if(l)try{u=await Wf(n,s,c)}catch(e){console.warn(`Bitmap resize failed, using a canvas:`,e.message)}try{u??=Hf(n,s,c)}catch(e){console.warn(`Texture not scaled for this screen:`,e.message);return}e.image=u,n.close?.(),e.needsUpdate=!0,r++})),r}var Kf=null,qf=e=>{Kf=e};async function Jf(e,t,n=null,r=null){let i=await Yf(e,t,n,r);return await Gf(i,Bf(t.split(`?`)[0])),i}async function Yf(e,t,n,r){let i=t.split(`?`)[0].slice(0,t.split(`?`)[0].lastIndexOf(`/`)+1),a=Mf===`element`,o=await(r?r(a):(a?Nf({imageElements:!0}):n??Nf()).parseAsync(e,i));if(a||Mf===`neither`||!Pf(o).length)return o;let s;try{s=await(r??(t=>Nf({imageElements:t}).parseAsync(e,i)))(!0)}catch(e){return console.warn(`${t}: image-element decode failed:`,e.message),o}let c=!Pf(s).length;return c?Mf=`element`:Mf===`bitmap`&&(Mf=`neither`),Kf?.(t,c),c?s:o}var Xf=[500,1500,4e3],Zf=25e3,Qf=e=>e===408||e===429||e>=500,$f=e=>new Promise(t=>setTimeout(t,e)),ep=e=>String(e).split(`?`)[0],tp=class extends Error{};async function np(e,{as:t=`arrayBuffer`,fetcher:n=(...e)=>fetch(...e),wait:r=$f,delays:i=Xf,budget:a=Zf,now:o=()=>Date.now()}={}){let s,c=0,l=o();for(;c<=i.length;c++){if(c){if(o()-l>a)break;await r(i[c-1])}try{let r=await n(e);if(!r.ok){let e=Error(`HTTP ${r.status}`);throw Qf(r.status)?e:new tp(e.message)}return t===`json`?await r.json():await r.arrayBuffer()}catch(t){if(t instanceof tp||t instanceof SyntaxError)throw Error(`${ep(e)}: ${t.message}`);s=t}}throw Error(`${ep(e)}: ${s?.message??s} (${c} ${c===1?`try`:`tries`})`)}async function rp(e,t,{track:n=!0}={}){let r=F;n&&r.itemStart(t);try{return await Jf(await np(t),t,e)}catch(e){throw n&&r.itemError(t),e}finally{n&&r.itemEnd(t)}}async function ip(e,{delays:t=Xf,wait:n=$f,budget:r=Zf,now:i=()=>Date.now()}={}){let a=i();for(let o=0;;o++){o&&await n(t[o-1]);try{return await new Vn().loadAsync(e)}catch(n){if(o>=t.length||i()-a>r)throw Error(`${ep(e)}: image failed to load (${o+1} ${o?`tries`:`try`})${n?.message?`: ${n.message}`:``}`)}}}function ap(e){let t=new sn;return ip(e).then(e=>{t.image=e.image,t.needsUpdate=!0},e=>console.warn(e.message)),t}function op(e,t){let n=new gn(1,22,10,0,Math.PI*2,0,Math.PI/2);n.setAttribute(`shieldFade`,new Rn(new Float32Array(t),1));let r=new lt({transparent:!0,depthWrite:!1,blending:2,side:2,forceSinglePass:!0,toneMapped:!1,vertexShader:`attribute float shieldFade; varying float vFade; varying vec2 vUv; varying float vRim;
      void main(){ vFade = shieldFade; vUv = uv; vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vec3 n = normalize(mat3(modelMatrix * instanceMatrix) * normal); vRim = clamp(1.0 - abs(dot(n, normalize(cameraPosition - world.xyz))), 0.0, 1.0);
        gl_Position = projectionMatrix * viewMatrix * world; }`,fragmentShader:`varying float vFade; varying vec2 vUv; varying float vRim;
      void main(){ vec2 cell = abs(fract(vUv * vec2(20.0, 6.0)) - 0.5); float grid = smoothstep(0.38, 0.5, max(cell.x, cell.y));
        float alpha = clamp(vFade * (0.04 + pow(max(vRim, 0.0), 2.2) * 0.45 + grid * 0.22), 0.0, 1.0);
        gl_FragColor = vec4(mix(vec3(0.18, 0.62, 1.0), vec3(0.55, 0.88, 1.0), grid), alpha); }`}),i=new _n(n,r,t);return i.frustumCulled=!1,i.count=0,i.instanceMatrix.setUsage(Xe),e.add(i),i}var sp=e=>e===`zergling`?.78:e===`baneling`?.72:e===`aberration`?2.7:1.35,cp={small:4.8,big:6.5},lp=2.6,up=[`hydralisk`,`roach`,`aberration`],dp=class{constructor(){this.clear()}clear(){this.corpses=[],this.pending=[],this.boss=null}handle(e,t,n=2){let r=e.presentationDelay??0;if(e.type===`bossDeath`)this.boss={...e,kind:`ultralisk`,deathTime:t+r,deathAge:-r,lifetime:n+1,phase:0};else if(e.type===`kill`&&e.z>-12&&[`zergling`,`hydralisk`,`baneling`,`roach`,`aberration`].includes(e.kind)){let n=up.includes(e.kind),i=n?60:410,a={...e,deathTime:t+r,deathAge:-r,lifetime:n?cp.big:cp.small,phase:e.phase??0,hit:0};if(this.corpses.reduce((e,t)=>e+(n?up.includes(t.kind):!up.includes(t.kind)),0)>=i){r>0&&this.pending.length<256&&this.pending.push(a);return}this.corpses.push(a)}else if(e.type===`casualty`){if(this.corpses.filter(e=>e.ally).length>=12)return;this.corpses.push({...e,ally:!0,deathTime:t,deathAge:0,lifetime:lp,phase:0,hit:1})}}update(e,t){for(let t of this.pending)t.deathAge+=e;this.pending=this.pending.filter(e=>e.deathAge<0);for(let n of this.corpses)n.deathAge+=e,n.z+=Math.min(e,Math.max(0,n.deathAge))*t,!n.ally&&n.z>6.4&&n.deathAge>=0&&(n.lifetime=Math.min(n.lifetime,Math.max(n.deathAge,.25)+.35));this.corpses=this.corpses.filter(e=>e.deathAge<e.lifetime),this.boss&&(this.boss.deathAge+=e,this.boss.deathAge>=this.boss.lifetime&&(this.boss=null))}};function fp(e,t,n=[]){if(e.count=t,e.visible=t>0,t){for(let r of[e.instanceMatrix,e.instanceColor,...n])if(r){if(t>r.count)throw RangeError(`Instance capacity exceeded: ${t} > ${r.count}`);r.clearUpdateRanges(),r.addUpdateRange(0,t*r.itemSize),r.needsUpdate=!0}}}var pp=()=>new Promise(e=>setTimeout(e,16)),mp=e=>e.isMesh||e.isPoints||e.isLine||e.isSprite,hp=e=>[...Object.values(e),...Object.values(e.uniforms??{}).map(e=>e?.value)].filter(e=>e?.isTexture).map(e=>e.uuid).join(`+`),gp=e=>{let t=0;for(let n=0;n<e.length;n++)t=Math.imul(t,31)+e.charCodeAt(n)|0;return t},_p=[`side`,`flatShading`,`fog`,`alphaHash`,`toneMapped`,`wireframe`,`dithering`,`premultipliedAlpha`,`sizeAttenuation`,`vertexColors`,`transparent`],vp=e=>[e.type,e.customProgramCacheKey?.()??``,JSON.stringify(e.defines??{}),e.isShaderMaterial?gp(e.vertexShader+e.fragmentShader):``,e.alphaTest>0,..._p.map(t=>e[t]),hp(e)].join(`:`);function yp(e){let t=[`isInstancedMesh`,`isBatchedMesh`,`isSkinnedMesh`,`isPoints`,`isLine`,`isSprite`].filter(t=>e[t]).join(),n=Object.keys(e.geometry?.attributes??{}).sort().join(),r=Object.keys(e.geometry?.morphAttributes??{}).join(),i=[e.material,e.customDepthMaterial,e.customDistanceMaterial].flat().filter(Boolean).map(vp).join(`/`);return`${t}|${n}|${r}|${!!e.instanceColor}|${e.castShadow}|${i}`}function bp(e,t,n,r,i){let a=new Set;for(let e of r)for(let t=e;t;t=t.parent)a.add(t);let o=[];t.traverse(e=>{if(a.has(e)||mp(e)){if(o.push([e,e.visible,e.frustumCulled,e.count]),!a.has(e)){e.visible=!1;return}e.visible=!0,e.frustumCulled=!1,e.isInstancedMesh&&e.count===0&&(e.count=1)}});let s=e.getRenderTarget();try{e.setRenderTarget(i),e.render(t,n)}finally{e.setRenderTarget(s);for(let[e,t,n,r]of o)e.visible=t,e.frustumCulled=n,r!==void 0&&(e.count=r)}}async function xp(e,t,n,r,{target:i=null}={}){let a=()=>e.getContext().isContextLost();if(a())return!1;let o=[],s=[],c=new AbortController,l=new Promise(t=>e.domElement.addEventListener(`webglcontextlost`,t,{once:!0,signal:c.signal}));try{let c=new Set,u=new Set,d=()=>{let e=[];return t.traverse(t=>{if(!mp(t)||u.has(t))return;u.add(t),t.isInstancedMesh&&t.count===0&&(s.push(t),t.count=1),t.isInstancedMesh&&!t.visible&&(o.push(t),t.visible=!0);let n=yp(t);c.has(n)||(c.add(n),e.push(t))}),e},f=performance.now();for(let r=d();r.length;r=d())for(let o=0;o<r.length;o+=16){if(a())return!1;let s=r.slice(o,o+16);try{let r=e.getRenderTarget(),o;try{e.setRenderTarget(i),o=Promise.all(s.map(r=>e.compileAsync(r,n,t)))}finally{e.setRenderTarget(r)}if(await Promise.race([o,l]),a())return!1;bp(e,t,n,s,i)}catch(e){if(!a())throw e;return!1}performance.now()-f>60&&(await pp(),f=performance.now())}return!a()&&(r(),!0)}finally{c.abort();for(let e of o)e.visible=!1;for(let e of s)e.count=0}}var Sp=[5,10,20,40];function Cp(e){let t=Sp.find(t=>e<t);return t?`ready-under-${t}s`:`ready-over-${Sp.at(-1)}s`}[...Sp.map(e=>`ready-under-${e}s`),`${Sp.at(-1)}`];function wp(e){return String(e??``).replace(/https?:\/\/[^\s)]+/g,e=>{try{return new URL(e).pathname}catch{return`(url)`}}).replace(/\s+/g,` `).trim().slice(0,200)}function Tp(e){let t=String(e??``).match(/([\w.-]+\.m?js):(\d+):(\d+)/);return t?`${t[1]}:${t[2]}:${t[3]}`:``}var Ep=[[/(^|\.)reddit\.com$|^com\.reddit\./,`reddit`],[/(^|\.)tieba\.baidu\.com$/,`tieba`],[/(^|\.)baidu\.com$/,`baidu`],[/(^|\.)bilibili\.com$|^b23\.tv$|^tv\.danmaku\./,`bilibili`],[/(^|\.)google\.[a-z.]+$|^com\.google\./,`google`],[/(^|\.)bing\.com$/,`bing`],[/(^|\.)duckduckgo\.com$/,`duckduckgo`],[/(^|\.)(twitter|x)\.com$|^t\.co$/,`x`],[/(^|\.)youtube\.com$|^youtu\.be$/,`youtube`],[/(^|\.)facebook\.com$|^com\.facebook\./,`facebook`],[/(^|\.)discord(app)?\.com$/,`discord`],[/(^|\.)ngabbs\.com$|(^|\.)nga\.cn$|(^|\.)178\.com$/,`nga`],[/(^|\.)douyin\.com$/,`douyin`],[/(^|\.)xiaohongshu\.com$/,`xiaohongshu`],[/(^|\.)zhihu\.com$/,`zhihu`],[/(^|\.)xiaoheihe\.cn$/,`xiaoheihe`],[/(^|\.)tiktok\.com$/,`tiktok`],[/(^|\.)news\.ycombinator\.com$/,`hackernews`],[/^ji-games\.pages\.dev$/,`ji-games`],[/(^|\.)jizhang\.io$/,`jizhang.io`]],Dp=e=>String(e??``).toLowerCase().replace(/^www\./,``).replace(/[^a-z0-9.:_-]/g,``).slice(0,48);function Op({ref:e=``,referrer:t=``,host:n=``,official:r=()=>!1}={}){let i=Dp(e).slice(0,24);if(i)return`ref:${i}`;let a=``;try{a=t?new URL(t).hostname.toLowerCase():``}catch{a=``}return a&&!r(a)?Ep.find(([e])=>e.test(a))?.[1]??Dp(a):r(n)&&!/pages\.dev$|^localhost$|^127\.|^\[?::1\]?$/.test(n)?Dp(n):``}var kp=`starcraft-shooter-2026.pages.dev`,Ap=`https://${kp}/`,jp=new Set([`localhost`,`127.0.0.1`,`::1`,`[::1]`]),Mp=new Set([`sc.lelandjin.com`]);function Np(e){let t=String(e??``).toLowerCase();return t===`starcraft-shooter-2026.pages.dev`||t.endsWith(`.starcraft-shooter-2026.pages.dev`)||Mp.has(t)||jp.has(t)}var Pp=()=>window.matchMedia(`(pointer: coarse)`).matches&&Math.min(screen.width,screen.height)<820?`phone`:`desktop`,Fp=()=>Np(location.hostname)&&![`localhost`,`127.0.0.1`,`::1`,`[::1]`].includes(location.hostname);function Ip(e){if(!Fp())return;let t=JSON.stringify({...e,device:Pp()});navigator.sendBeacon?.(`/api/events`,new Blob([t],{type:`text/plain`}))||fetch(`/api/events`,{method:`POST`,body:t,keepalive:!0}).catch(()=>{})}var Lp=e=>Ip({event:e}),Rp=()=>Ip({event:`visit`,source:Op({ref:new URLSearchParams(location.search).get(`ref`)??``,referrer:document.referrer,host:location.hostname,official:Np})}),zp=e=>Ip({event:Cp(e)}),Bp=new Set;function Vp(e,t=``){let n=wp(e);!n||Bp.has(n)||Bp.size>=5||(Bp.add(n),Ip({event:`error`,message:n,source:wp(t)}))}function Hp(){window.addEventListener(`error`,e=>{e.target&&e.target!==window||Vp(e.message,e.filename?`${e.filename}:${e.lineno}`:``)}),window.addEventListener(`unhandledrejection`,e=>Vp(e.reason?.message??e.reason,[`promise`,Tp(e.reason?.stack)].filter(Boolean).join(` `)))}var Up=Z.marineCapMax,Wp=Z.tankCapMax,Gp=Math.ceil(Z.supportCapMax/tc.length),Kp={warpig:Bn.warPigs.cap,siegebreaker:Bn.siegeBreakers.cap,odin:Bn.odin.cap},qp={bones:[`Bone_Barrel_L`,`Bone_Barrel_R`],distance:.3},Jp=.4,Yp=[{id:`raynor`,name:`RAYNOR / SC2`,faction:`TERRAN`,file:`/assets/models/raynor-sc2.glb`,height:2.2,yaw:Math.PI,clip:`WalkFire`,frames:12,author:`Blizzard / StarCraft II`},{id:`marine`,name:`MARINE / SC2`,faction:`TERRAN`,file:`/assets/models/marine-sc2.glb`,height:1.8,yaw:Math.PI,clip:`WalkFire`,frames:12,weaponMaterial:`Rifle`,author:`Blizzard / StarCraft II`},{id:`firebat`,name:`FIREBAT / SC2`,faction:`TERRAN`,file:`/assets/models/firebat-sc2.glb`,height:1.95,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:6,author:`Blizzard / StarCraft II`},{id:`tank`,name:`SIEGE TANK / SC2`,faction:`TERRAN`,file:`/assets/models/siegetank-morph-sc2.glb`,width:2.8,yaw:Math.PI,clip:`Morph`,restAt:.3,frames:1,attackFrames:6,kick:qp,treads:!0,author:`Blizzard / StarCraft II`},{id:`thor`,name:`THOR / SC2`,faction:`TERRAN`,file:`/assets/models/thor-sc2.glb`,height:4,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:16,author:`Blizzard / StarCraft II`},{id:`immortal`,name:`IMMORTAL / SC2`,faction:`PROTOSS`,file:`/assets/models/immortal-sc2.glb`,height:3.1,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,author:`Blizzard / StarCraft II`},{id:`templar`,name:`HIGH TEMPLAR / SC2`,faction:`PROTOSS`,file:`/assets/models/templar-sc2.glb`,height:2.5,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,author:`Blizzard / StarCraft II`},{id:`colossus`,name:`COLOSSUS / SC2`,faction:`PROTOSS`,file:`/assets/models/colossus-sc2.glb`,height:7.2,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:16,muzzleBones:[`Ref_Weapon Left`,`Ref_Weapon Right`],author:`Blizzard / StarCraft II`},{id:`zealot`,name:`ZEALOT / SC2`,faction:`PROTOSS`,file:`/assets/models/zealot-sc2.glb`,height:2.1,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:12,author:`Blizzard / StarCraft II`},{id:`dragoon`,name:`DRAGOON / SC2`,faction:`PROTOSS`,file:`/assets/models/dragoon-sc2.glb`,height:2.6,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,muzzleBones:[`Ref_Weapon Left`],author:`Blizzard / StarCraft II`},{id:`reaver`,name:`REAVER / SC2`,faction:`PROTOSS`,file:`/assets/models/reaver-sc2.glb`,width:2.6,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:10,deathClip:`Death`,deathFrames:14,muzzleBones:[`Ref_Weapon`],author:`Blizzard / StarCraft II`},{id:`scarab`,name:`SCARAB / SC2`,faction:`PROTOSS`,file:`/assets/models/scarab-sc2.glb`,width:.6,yaw:Math.PI,frames:1,author:`Blizzard / StarCraft II`},{id:`artanis`,name:`ARTANIS / SC2`,faction:`PROTOSS`,file:`/assets/models/artanis-sc2.glb`,height:2.5,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,deathClip:`Death`,deathFrames:10,author:`Blizzard / StarCraft II`},{id:`carrier`,name:`CARRIER / SC2`,faction:`PROTOSS`,file:`/assets/models/carrier-sc2.glb`,width:3.2,hover:2.6,plate:[.86,.72,.52],yaw:Math.PI,clip:`Walk`,frames:16,deathClip:`Death`,deathFrames:16,author:`Blizzard / StarCraft II`},{id:`interceptor`,name:`INTERCEPTOR / SC2`,faction:`PROTOSS`,file:`/assets/models/interceptor-sc2.glb`,width:.7,yaw:Math.PI,clip:`Stand`,frames:4,author:`Blizzard / StarCraft II`},{id:`purifierDragoon`,name:`PURIFIER DRAGOON / SC2`,faction:`PROTOSS`,file:`/assets/models/dragoon-purifier-sc2.glb`,height:2.6,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,author:`Blizzard / StarCraft II`},{id:`taldarimReaver`,name:`TAL'DARIM REAVER / SC2`,faction:`PROTOSS`,file:`/assets/models/reaver-taldarim-sc2.glb`,width:3.1,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:10,deathClip:`Death`,deathFrames:14,muzzleBones:[`Ref_Weapon`],author:`Blizzard / StarCraft II`},{id:`goldenCarrier`,name:`GOLDEN ARMADA CARRIER / SC2`,faction:`PROTOSS`,file:`/assets/models/carrier-golden-sc2.glb`,width:3.6,hover:2.8,yaw:Math.PI,clip:`Walk`,frames:16,author:`Blizzard / StarCraft II`},{id:`stasisCell`,name:`STASIS CELL / SC2`,faction:`PROTOSS`,file:`/assets/models/stasis-cell-sc2.glb`,height:2.4,yaw:Math.PI,frames:1,author:`Blizzard / StarCraft II`},{id:`tempest`,name:`TEMPEST / SC2`,faction:`PROTOSS`,file:`/assets/models/tempest-sc2.glb`,width:4.4,hover:3,plate:[.92,.8,.62],yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,deathClip:`Death`,deathFrames:14,author:`Blizzard / StarCraft II`},{id:`darktemplar`,name:`DARK TEMPLAR / SC2`,faction:`PROTOSS`,file:`/assets/models/darktemplar-sc2.glb`,height:2.1,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:10,deathClip:`Death`,deathFrames:12,author:`Blizzard / StarCraft II`},{id:`phoenix`,name:`PHOENIX / SC2`,faction:`PROTOSS`,file:`/assets/models/phoenix-sc2.glb`,width:2.2,hover:3.5,yaw:Math.PI,clip:`Walk`,frames:12,deathClip:`Death`,deathFrames:12,author:`Blizzard / StarCraft II`},{id:`archon`,name:`ARCHON / SC2`,faction:`PROTOSS`,file:`/assets/models/archon-sc2.glb`,height:3.2,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,deathClip:`Death`,deathFrames:12,author:`Blizzard / StarCraft II`},{id:`hellion`,name:`HELLION / SC2`,faction:`TERRAN`,file:`/assets/models/hellion-sc2.glb`,width:1.7,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:8,muzzleBones:[`Ref_Weapon 01`],author:`Blizzard / StarCraft II`},{id:`hellbat`,name:`HELLBAT / SC2`,faction:`TERRAN`,file:`/assets/models/hellbat-sc2.glb`,height:2.3,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:10,muzzleBones:[`Ref_Weapon 01`],author:`Blizzard / StarCraft II`},{id:`goliath`,name:`GOLIATH / SC2`,faction:`TERRAN`,file:`/assets/models/goliath-sc2.glb`,height:3,yaw:Math.PI,clip:`Walk`,frames:12,deathClip:`Death`,deathFrames:12,author:`Blizzard / StarCraft II`},{id:`cyclone`,name:`CYCLONE / SC2`,faction:`TERRAN`,file:`/assets/models/cyclone-sc2.glb`,width:2,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:4,deathClip:`Death`,deathFrames:12,muzzleBones:[`Ref_Weapon`],author:`Blizzard / StarCraft II`},{id:`sciencevessel`,name:`SCIENCE VESSEL / SC2`,faction:`TERRAN`,file:`/assets/models/sciencevessel-sc2.glb`,width:2.4,hover:3,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:10,author:`Blizzard / StarCraft II`},{id:`ares`,name:`A.R.E.S. / SC2`,faction:`TERRAN`,file:`/assets/models/ares-sc2.glb`,height:3,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:4,muzzleBones:[`Ref_Weapon`],author:`Blizzard / StarCraft II`},{id:`spidermine`,name:`SPIDER MINE / SC2`,faction:`TERRAN`,file:`/assets/models/spidermine-sc2.glb`,width:.6,yaw:Math.PI,clip:`Walk`,frames:6,attackClip:`Unburrow`,attackFrames:8,author:`Blizzard / StarCraft II`},{id:`laserdrill`,name:`DRAKKEN LASER DRILL / SC2`,faction:`TERRAN`,file:`/assets/models/laserdrill-sc2.glb`,height:6,yaw:Math.PI,clip:`Stand`,frames:1,author:`Blizzard / StarCraft II`},{id:`junkerHellion`,name:`JUNKER HELLION / SC2`,faction:`TERRAN`,file:`/assets/models/hellion-junker-sc2.glb`,width:1.8,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:8,author:`Blizzard / StarCraft II`},{id:`covertTank`,name:`COVERT OPS SIEGE TANK / SC2`,faction:`TERRAN`,file:`/assets/models/siegetank-covert-sc2.glb`,width:2.8,yaw:Math.PI,clip:`Walk`,frames:8,attackClip:`Attack`,attackFrames:6,treads:!0,author:`Blizzard / StarCraft II`},{id:`junkerThor`,name:`JUNKER THOR / SC2`,faction:`TERRAN`,file:`/assets/models/thor-junker-sc2.glb`,height:4,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:16,author:`Blizzard / StarCraft II`},{id:`warpig`,name:`WAR PIGS / SC2`,faction:`TERRAN`,file:`/assets/models/warpigs-sc2.glb`,height:1.8,yaw:Math.PI,clip:`WalkFire`,frames:12,weaponMaterial:`Rifle`,author:`Blizzard / StarCraft II`},{id:`siegebreaker`,name:`SIEGE BREAKERS / SC2`,faction:`TERRAN`,file:`/assets/models/siegetank-merc-morph-sc2.glb`,width:2.5,yaw:Math.PI,clip:`Morph`,restAt:.3,frames:1,attackFrames:6,kick:qp,treads:!0,author:`Blizzard / StarCraft II`},{id:`banshee`,name:`BANSHEE / SC2`,faction:`TERRAN`,file:`/assets/models/banshee-sc2.glb`,height:.9,yaw:Math.PI,clip:`Walk`,frames:12,attackClip:`Attack`,attackFrames:12,live:!0,author:`Blizzard / StarCraft II`},{id:`odin`,name:`ODIN / SC2`,faction:`TERRAN`,file:`/assets/models/odin-sc2.glb`,textureSize:1024,height:4,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:16,surface:{metal:.35,roughness:.58,reflect:1.35,tone:1.1,rim:.16},abilityClips:{Deploy:20,Barrage:24,Recover:20},muzzleBones:[`Ref_Weapon_03`,`Ref_Weapon_02`,`Ref_Weapon_04`,`Ref_Weapon_01`],author:`Blizzard / StarCraft II`},{id:`zergling`,name:`ZERGLING / SCR`,faction:`ZERG`,file:`/assets/models/zergling-scr.glb`,phoneFile:`/assets/models/zergling-scr-phone.glb`,height:1.5,yaw:Math.PI,clip:`Walk`,clipSpan:1,frames:20,author:`DaveTheSpectre`},{id:`baneling`,name:`BANELING / SC2`,faction:`ZERG`,file:`/assets/models/baneling-sc2.glb`,height:1.05,yaw:Math.PI,clip:`Walk Superior`,frames:16,author:`Blizzard / StarCraft II`},{id:`ultralisk`,name:`ULTRALISK`,faction:`ZERG`,file:`/assets/models/ultralisk-classic.glb`,width:2.8,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:8,author:`SC: Evolution / Blizzard`},{id:`roach`,name:`ROACH / SC2`,faction:`ZERG`,file:`/assets/models/roach-sc2.glb`,height:2.05,yaw:Math.PI,clip:`Walk`,frames:10,attackClip:`Attack`,attackFrames:12,deathClip:`Death`,deathFrom:1.45,deathFrames:14,author:`Blizzard / StarCraft II`},{id:`aberration`,name:`ABERRATION / SC2`,faction:`ZERG`,file:`/assets/models/aberration-sc2.glb`,height:4.2,brighten:1.4,yaw:Math.PI,clip:`Walk`,frames:16,attackClip:`Attack`,attackFrames:12,author:`Blizzard / StarCraft II`},{id:`hydralisk`,name:`HYDRALISK`,faction:`ZERG`,file:`/assets/models/hydralisk-classic.glb`,phoneFile:`/assets/models/hydralisk-classic-phone.glb`,height:2.4,yaw:Math.PI,clip:`Walk`,frames:8,attackClip:`Attack`,attackFrames:6,author:`SC: Evolution / Blizzard`}],Xp=new Map,Zp=new J,Qp={TERRAN:{metal:.6,roughness:.42,reflect:1.8,tone:1.3,rim:.22},PROTOSS:{metal:.7,roughness:.48,reflect:1.4,tone:.8,rim:.14},ZERG:{roughness:.4}};function $p(e,t){let n=e.clone();n.side=2,n.transparent&&(n.forceSinglePass=!0);let r=Yp.find(e=>e.id===t),i=r?.faction;n.transparent&&i===`ZERG`&&(n.depthWrite=!0);let a=[],o=[],s=n.transparent?null:{...Qp[i],...r?.surface};s?.metal&&(n.metalness=s.metal),s?.roughness&&(n.roughness=s.roughness),s?.tone&&!e.userData.toned&&(n.color.multiplyScalar(s.tone),n.userData.toned=!0);let c=s&&r?.plate;if(c&&!e.userData.plated&&(n.color.multiply(new S(...c)),n.userData.plated=!0),s?.reflect&&(o.push(`reflect${s.reflect}`),a.push(e=>{e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_maps>`,`
      #include <lights_fragment_maps>
      radiance *= ${s.reflect.toFixed(2)};
    `)})),s?.rim&&(o.push(`rim${s.rim}`),a.push(e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`
      #include <emissivemap_fragment>
      float rimFacing = 1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0);
      totalEmissiveRadiance += vec3(0.62, 0.8, 1.0) * pow(rimFacing, 4.0) * ${s.rim.toFixed(2)} * (0.35 + diffuseColor.rgb);
    `)})),a.length){n.onBeforeCompile=e=>a.forEach(t=>t(e));let e=o.join(`+`);n.customProgramCacheKey=()=>e}return n}var em=[.27,.36,.46];function tm(e){if(e.emissiveMap)throw Error(`${e.name}: lite material expects no emissive map`);return new ye({name:e.name,map:e.map,color:e.color,emissiveMap:e.map,emissive:new S(...em),side:2})}function nm(e,t){let n=e.geometry.clone();for(let e of Object.keys(n.attributes))[`position`,`normal`,`uv`,`uv1`,`color`].includes(e)||n.deleteAttribute(e);n.morphAttributes={};let r=new Float32Array(n.attributes.position.count*3);for(let i=0;i<n.attributes.position.count;i++)e.getVertexPosition(i,Zp).applyMatrix4(e.matrixWorld),t&&Zp.applyMatrix4(t),Zp.toArray(r,i*3);return n.setAttribute(`position`,new xt(r,3)),n.deleteAttribute(`normal`),n.computeVertexNormals(),n.computeBoundingBox(),n}var rm=new Map;function im(e){let t=rm.get(e);return t||(t={users:0,buffer:np(Ot(e))},rm.set(e,t)),t.users++,t.buffer.then(t=>Jf(t,e)).finally(()=>{--t.users===0&&rm.get(e)===t&&rm.delete(e)})}function am(e,{phone:t=!1}={}){let n=Yp.find(t=>t.id===e),r=t&&n.phoneFile,i=r?`${e}:phone`:e;if(Xp.has(i))return Xp.get(i);let a=om(r?{...n,file:n.phoneFile}:n);return a.catch(()=>{Xp.get(i)===a&&Xp.delete(i)}),Xp.set(i,a),a}async function om(e){let t=await im(e.file),n=[];if(t.scene.traverse(e=>{e.isMesh&&n.push(e)}),!n.length)throw Error(`${e.id}: model contains no renderable meshes`);let r=(t.parser.json.materials??[]).filter(e=>e.pbrMetallicRoughness?.baseColorTexture).map(e=>e.name),i=[...new Set(n.map(e=>e.material))].filter(e=>r.includes(e.name)&&!e.map);i.length&&Vp(`${e.id}: texture failed to decode (${i.map(e=>e.name).join(`, `)})`,`model`);let a=t.animations.find(t=>t.name===e.clip);if(e.clip&&!a)throw Error(`${e.id}: missing movement animation ${e.clip}`);let o=e.attackClip?t.animations.find(t=>t.name===e.attackClip):null;if(e.attackClip&&!o)throw Error(`${e.id}: missing attack animation ${e.attackClip}`);let s=e.deathClip?t.animations.find(t=>t.name===e.deathClip):null;if(e.deathClip&&!s)throw Error(`${e.id}: missing death animation ${e.deathClip}`);let c=new Vt(t.scene);a&&c.clipAction(a).play();function l(e){c.setTime(e),t.scene.updateMatrixWorld(!0),new Set(n.filter(e=>e.isSkinnedMesh).map(e=>e.skeleton)).forEach(e=>e.update())}let u=e.restAt??0;l(u);let d=new y().makeRotationY(e.yaw),f=n.map(e=>nm(e,d)),p=new Gn;f.forEach(e=>p.union(e.boundingBox));let m=p.getSize(new J),h=p.getCenter(new J),g=e.width?e.width/m.x:e.height/m.y,_=new y().makeScale(g,g,g).multiply(new y().makeTranslation(-h.x,-p.min.y,-h.z)).multiply(d);f.forEach(e=>e.dispose());let v=new Map;for(let t of n){if(Array.isArray(t.material))throw Error(`${e.id}: unexpected multi-material primitive`);if(!v.has(t.material)){let n=$p(t.material,e.id);v.set(t.material,n)}}if(e.skin){let t=new Set;for(let n of v.values()){let r=n.map&&e.skin[n.map.name];if(!r)continue;let i=await ip(r);i.flipY=!1,i.colorSpace=n.map.colorSpace,i.wrapS=n.map.wrapS,i.wrapT=n.map.wrapT,i.name=n.map.name,n.map=i,t.add(i.name)}let n=Object.keys(e.skin).filter(e=>!t.has(e));if(n.length)throw Error(`${e.id}: no source map named ${n.join(`, `)} to repaint`)}let b=[],x=[],S=(e.muzzleBones??[]).map(n=>{let r=t.scene.getObjectByName(st.sanitizeNodeName(n));if(!r)throw Error(`${e.id}: missing muzzle bone ${n}`);return r}),C=(e.kick?.bones??[]).map(n=>{let r=t.scene.getObjectByName(st.sanitizeNodeName(n));if(!r)throw Error(`${e.id}: missing kick bone ${n}`);return{node:r,x:0}}),w=C.length>0,T=e.frames+(o||w?e.attackFrames:0),E=e.deathFrom??0,D=s?s.duration-E:0;if(s&&D<=0)throw Error(`${e.id}: deathFrom ${E} is past the end of ${e.deathClip}`);let O=T+(s?e.deathFrames:0),k=Object.entries(e.abilityClips??{}).map(([n,r])=>{let i=t.animations.find(e=>e.name===n);if(!i)throw Error(`${e.id}: missing ability animation ${n}`);let a={name:n,clip:i,start:O,frames:r};return O+=r,a});for(let r=0;r<O;r++){let i=k.find(e=>r>=e.start&&r<e.start+e.frames);if(r===e.frames&&o&&(c.stopAllAction(),c.clipAction(o).play()),r===T&&s){c.stopAllAction();let e=c.clipAction(s);e.setLoop(Qn),e.clampWhenFinished=!0,e.play()}if(i&&r===i.start){c.stopAllAction();let e=c.clipAction(i.clip);e.setLoop(Qn),e.clampWhenFinished=!0,e.play()}if(i)l(i.clip.duration*(r-i.start)/(i.frames-1));else if(w&&r>=e.frames&&r<T){l(u);let i=1-(r-e.frames)/e.attackFrames;for(let t of C)t.x=t.node.position.x,t.node.position.x-=e.kick.distance*i*i;t.scene.updateMatrixWorld(!0),n.filter(e=>e.isSkinnedMesh).forEach(e=>e.skeleton.update())}else l(r>=T?E+D*(r-T)/(e.deathFrames-1):r>=e.frames?o.duration*(r-e.frames)/e.attackFrames:a?u+(e.clipSpan??a.duration)*r/e.frames:0);x.push(S.map(e=>e.getWorldPosition(new J).applyMatrix4(_)));let d=new Map;for(let e of n){let t=v.get(e.material),n=nm(e,_);d.has(t)||d.set(t,[]),d.get(t).push(n)}let f=[];for(let[t,n]of d){let r=Object.keys(n[0].attributes).filter(e=>n.every(t=>t.hasAttribute(e)));n.forEach(e=>{Object.keys(e.attributes).filter(e=>!r.includes(e)).forEach(t=>e.deleteAttribute(t))});let i=Td(n,!1);if(!i)throw Error(`${e.id}: could not merge material primitives`);f.push({geometry:i,material:t}),n.forEach(e=>e.dispose())}if(b.push(f),w&&r>=e.frames&&r<T)for(let e of C)e.node.position.x=e.x}return c.stopAllAction(),c.uncacheRoot(t.scene),{config:e,frames:b,muzzles:x,abilities:Object.fromEntries(k.map(({name:e,start:t,frames:n})=>[e,{start:t,frames:n}])),duration:e.clipSpan??a?.duration??1,attackDuration:o?.duration??(w?Jp:void 0),deathStart:s?T:-1,deathDuration:s?D:void 0,bounds:{x:m.x*g,y:m.y*g,z:m.z*g},clips:t.animations.map(e=>e.name)}}function sm(e,t){if(!t)return null;let n=e.abilities[t.clip];if(!n)throw Error(`${e.config.id}: unbaked ability ${t.clip}`);return n.start+Math.round(He.clamp(t.progress,0,1)*(n.frames-1))}var cm=new d,lm=700,um=new S,dm=new WeakMap,fm=new S(1.05,1.45,1.75),pm=[1.7,.95,2.9],mm=g.frostfallFreeze;function hm(e,t){return!(e.frozen>0)||e.frozen>mm?(dm.delete(e),null):(dm.has(e)||dm.set(e,t),dm.get(e))}var gm=new S,_m=[[1,1,1],[1.7,1.45,1.05],[2.4,2.15,1.7],[2.2,2.6,3.4]],vm=2048,ym=new WeakMap;function bm(e){if(ym.has(e))return ym.get(e);let t=e.frames[0].map((t,n)=>{let r=e.frames[0][n].geometry.attributes.position.count,i=Math.ceil(r*2/vm),a=new Float32Array(vm*i*e.frames.length*4);e.frames.forEach((t,o)=>{let{position:s,normal:c}=t[n].geometry.attributes;if(s.count!==r)throw Error(`${e.config.id}: pose ${o} of batch ${n} has ${s.count} vertices, pose 0 has ${r}`);let l=o*i*vm*4;for(let e=0;e<r;e++){let t=l+e*8;a[t]=s.getX(e),a[t+1]=s.getY(e),a[t+2]=s.getZ(e),a[t+3]=1,a[t+4]=c.getX(e),a[t+5]=c.getY(e),a[t+6]=c.getZ(e)}});let o=new O(a,vm,i*e.frames.length,An,Dn);return o.minFilter=o.magFilter=ae,o.generateMipmaps=!1,o.needsUpdate=!0,{texture:o,rows:i}});return ym.set(e,t),t}var xm=`
  uniform highp sampler2D poseTexture;
  uniform int poseRows;
  attribute float poseFrame;
  vec4 poseTexel(int texel) {
    // A power-of-two row width: the column and row are a mask and a shift.
    int row = int(poseFrame + .5) * poseRows + (texel >> ${Math.log2(vm)});
    return texelFetch(poseTexture, ivec2(texel & 2047, row), 0);
  }`;function Sm(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey?.call(e)??``;return e.onBeforeCompile=(r,i)=>{n?.call(e,r,i),r.uniforms.poseTexture={value:t.texture},r.uniforms.poseRows={value:t.rows},r.vertexShader=r.vertexShader.replace(`#include <common>`,`#include <common>${xm}`).replace(`#include <beginnormal_vertex>`,`vec3 objectNormal = poseTexel(gl_VertexID * 2 + 1).xyz;
#ifdef USE_TANGENT
vec3 objectTangent = vec3(tangent.xyz);
#endif`).replace(`#include <begin_vertex>`,`vec3 transformed = poseTexel(gl_VertexID * 2).xyz;
#ifdef USE_ALPHAHASH
vPosition = vec3(position);
#endif`)},e.customProgramCacheKey=()=>`${r}+poses`,e}var Cm={life:.45,inflate:.07,broken:1.6,cell:2.6};function wm(e){return new lt({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{poseTexture:{value:e.texture},poseRows:{value:e.rows}},vertexShader:`${xm}
      attribute float shieldGlow;
      varying float vGlow; varying vec3 vWorld; varying vec3 vNormal;
      void main() {
        vec3 n = normalize(poseTexel(gl_VertexID * 2 + 1).xyz);
        vec4 world = modelMatrix * instanceMatrix * vec4(poseTexel(gl_VertexID * 2).xyz + n * ${Cm.inflate.toFixed(3)}, 1.0);
        vNormal = normalize(mat3(modelMatrix * instanceMatrix) * n); vWorld = world.xyz; vGlow = shieldGlow;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,fragmentShader:`
      varying float vGlow; varying vec3 vWorld; varying vec3 vNormal;
      // Distance to the nearest edge of a hex lattice, 0 on an edge.
      float hexEdge(vec2 p) {
        p *= ${Cm.cell.toFixed(2)};
        vec2 r = vec2(1.0, 1.7320508), h = r * .5;
        vec2 a = mod(p, r) - h, b = mod(p - h, r) - h, g = dot(a, a) < dot(b, b) ? a : b;
        g = abs(g);
        return .5 - max(dot(g, normalize(r)), g.x);
      }
      void main() {
        vec3 n = normalize(vNormal), v = normalize(cameraPosition - vWorld), m = abs(n);
        // The lattice is laid over the plate from whichever side the surface faces most.
        vec2 p = m.y > m.x && m.y > m.z ? vWorld.xz : m.x > m.z ? vWorld.zy : vWorld.xy;
        float edge = 1.0 - smoothstep(.0, .07, hexEdge(p));
        float rim = pow(clamp(1.0 - abs(dot(n, v)), 0.0, 1.0), 2.2);
        // Edges and lattice only: a fill over the whole plate washed a ship under fire out to pale blue.
        float a = vGlow * (rim * .6 + edge * (.12 + rim * .5));
        gl_FragColor = vec4(mix(vec3(.2, .55, 1.0), vec3(.7, .92, 1.0), edge * .6 + rim * .4) * a, 1.0);
      }`})}var Tm={halfTrack:.8,maxTurn:.25},Em=`
  attribute float treadShift;`,Dm=[`MAP`,`NORMALMAP`,`EMISSIVEMAP`,`ROUGHNESSMAP`,`METALNESSMAP`,`AOMAP`].map(e=>`#ifdef USE_${e}\n  v${e.charAt(0)+e.slice(1).toLowerCase().replace(`map`,`Map`)}Uv.y += treadShift;\n#endif`).join(`
`);function Om(e){let t=e.onBeforeCompile,n=e.customProgramCacheKey?.call(e)??``;return e.onBeforeCompile=(n,r)=>{t?.call(e,n,r),n.vertexShader=n.vertexShader.replace(`#include <common>`,`#include <common>${Em}`).replace(`#include <uv_vertex>`,`#include <uv_vertex>\n${Dm}`)},e.customProgramCacheKey=()=>`${n}+treads`,e}function km(e){let t=e.attributes.position,n=e.attributes.uv,r=e.index?.array,i=[];if(!n||!r)throw Error(`tread batch without uvs or index`);for(let e=0;e<r.length;e+=3)for(let[a,o]of[[r[e],r[e+1]],[r[e+1],r[e+2]],[r[e+2],r[e]]]){let e=Math.hypot(t.getX(a)-t.getX(o),t.getY(a)-t.getY(o),t.getZ(a)-t.getZ(o));e>.05&&Math.abs(n.getX(a)-n.getX(o))<.05&&i.push(Math.abs(n.getY(a)-n.getY(o))/e)}if(!i.length)throw Error(`tread batch has no edge along its texture`);return i.sort((e,t)=>e-t),i[Math.floor(i.length/2)]}var Am=[`tank`,`siegebreaker`,`thor`,`immortal`,`colossus`],jm=[`flame`,`napalm`,`thermal`,`resweep`],Mm=[.16,.12,.11],Nm=[.19,.21,.27];function Pm(e,t,n,r,i,a,o,s){let c=Math.cos(i),l=Math.sin(i),u=Math.cos(a),d=Math.sin(a),f=Math.cos(o),p=Math.sin(o),m=c*f,h=c*p,g=l*f,_=l*p;e[0]=u*f*s,e[1]=(h+g*d)*s,e[2]=(_-m*d)*s,e[3]=0,e[4]=-u*p*s,e[5]=(m-_*d)*s,e[6]=(g+h*d)*s,e[7]=0,e[8]=d*s,e[9]=-l*u*s,e[10]=c*u*s,e[11]=0,e[12]=t,e[13]=n,e[14]=r,e[15]=1}var Fm=class{constructor(e,t,n,r,{lite:i=!1,shadow:a=r!==`zergling`}={}){this.model=t,this.kind=r,this.creature=[`zergling`,`hydralisk`,`baneling`,`roach`,`aberration`,`ultralisk`].includes(r);let s=t.config.weaponMaterial;if(this.weaponBatch=s?t.frames[0].findIndex(e=>e.material.name===s):-1,s&&this.weaponBatch<0)throw Error(`${r}: no material named ${s} to light`);let c=bm(t);this.poseFrame=new Rn(new Float32Array(n),1).setUsage(Xe);let l=new Float32Array(n*16);for(let e=0;e<n;e++)l[e*16]=l[e*16+5]=l[e*16+10]=l[e*16+15]=1;if(this.matrices=new Rn(l,16).setUsage(Xe),this.tints=new Rn(new Float32Array(n*3).fill(1),3).setUsage(Xe),this.accents=this.weaponBatch>=0?new Rn(new Float32Array(n*3).fill(1),3).setUsage(Xe):null,this.meshes=t.frames[0].map((s,l)=>{let u=s.geometry.clone();u.setAttribute(`poseFrame`,this.poseFrame);let d=Sm(i?tm(s.material):$p(s.material,t.config.id),c[l]),f=new _n(u,d,n);return f.name=r,f.instanceMatrix=this.matrices,f.instanceColor=l===this.weaponBatch?this.accents:this.tints,f.castShadow=a,f.receiveShadow=!i,f.castShadow&&(f.customDepthMaterial=Sm(new o,c[l])),f.frustumCulled=!1,f.count=0,e.add(f),f}),this.treads=null,t.config.treads){let e={left:[],right:[]};if(t.frames[0].forEach((t,n)=>{let r=/tread[s]?_l/i.test(t.material.name)?`left`:/tread[s]?_r/i.test(t.material.name)?`right`:null;r&&e[r].push(n)}),!e.left.length||!e.right.length)throw Error(`${r}: treads asked for, but no Tank_Treads_L / _R materials`);this.treads={perMetre:km(t.frames[0][e.left[0]].geometry),last:new WeakMap};for(let t of[`left`,`right`]){let r=new Rn(new Float32Array(n),1).setUsage(Xe);this.treads[t]=r;for(let n of e[t])this.meshes[n].geometry.setAttribute(`treadShift`,r),Om(this.meshes[n].material),this.meshes[n].treadShift=r}}this.shieldSkins=[],t.config.faction===`PROTOSS`&&!i&&(this.shieldPose=new Rn(new Float32Array(n),1).setUsage(Xe),this.shieldGlow=new Rn(new Float32Array(n),1).setUsage(Xe),t.frames[0].forEach((t,i)=>{if(t.material.transparent)return;let a=t.geometry.clone();a.setAttribute(`poseFrame`,this.shieldPose),a.setAttribute(`shieldGlow`,this.shieldGlow);let o=new _n(a,wm(c[i]),n);o.name=`${r}-shield`,o.instanceMatrix.setUsage(Xe),o.frustumCulled=!1,o.count=0,o.renderOrder=2,e.add(o),this.shieldSkins.push(o)}))}roll(e,t){let n=this.treads,r=n.last.get(e),i=e.yaw??0,a=e.scale??1,o=r??{x:e.x,z:e.z,yaw:i,left:0,right:0};if(r&&e.hp>0){let t=e.x-r.x,s=e.z-r.z,c=-Math.sin(i),l=-Math.cos(i),u=t*c+s*l+Math.abs(t*l-s*c),d=He.clamp(Math.atan2(Math.sin(i-r.yaw),Math.cos(i-r.yaw)),-Tm.maxTurn,Tm.maxTurn)*Tm.halfTrack*a,f=n.perMetre/a;o.left=(r.left+(u+d)*f)%64,o.right=(r.right+(u-d)*f)%64}o.x=e.x,o.z=e.z,o.yaw=i,n.last.set(e,o),n.left.array[t]=o.left,n.right.array[t]=o.right}update(e,t,n=1,r=0){let i=0,a=this.weaponBatch>=0?_m[Math.min(_m.length-1,Math.max(0,n-1))]:null,o=this.meshes,s=this.poseFrame.array;e.forEach((e,n)=>{let o=this.model.config.frames,c=hm(e,t)??(e.deathAge<0?t:e.deathTime??t),l=e.gait??1,u=this.model.config.deathFrames,d=e.hp>0?sm(this.model,e.abilityAnimation):null,f=this.model.deathStart>=0&&!e.ally&&e.deathAge>=0?this.model.deathStart+Math.min(u-1,Math.floor(e.deathAge/this.model.deathDuration*(u-1))):d===null?this.model.config.attackFrames&&e.attackAnimation>0?o+Math.min(this.model.config.attackFrames-1,Math.floor((1-e.attackAnimation/(e.attackDuration??.45))*this.model.config.attackFrames)):Math.floor((c*l/this.model.duration+(e.phase??e.id*.13))*o)%o:d;s[n]=f,this.treads&&this.roll(e,n);let p=c*12*l+(e.phase??0),m=this.creature,h=e.id*2654435761>>>0,g=((m?.86:.82)+(h>>>8&255)/255*(m?.62:.34))*(this.model.config.brighten??1),_=(m?.88:.94)+(h>>>16&255)/255*(m?.26:.12),v=m?.9+(h>>>24&255)/255*.2:1,y=(this.kind===`ultralisk`?2.7:1)*(e.scale??1),b=this.model.config.hover??0,x=e.lunge?Math.sin((1-e.lunge.t/ds)*Math.PI)*.85:0,S=e.blink?.x??0,C=e.blink?.z??0,w=e.x+(e.lunge?.x??0)*x+S,T=(e.liftY??0)+(e.arrival??0)*1.6+(m?Math.abs(Math.sin(p))*.035:0)+(b?b+Math.sin(p*.6)*.12:0),E=e.z+(e.lunge?.z??0)*x+C+(this.kind===`tank`||this.kind===`siegebreaker`?(e.recoil??0)*.15:0),D=m?Math.sin(p)*.018:-(e.recoil??0)*.025,O=m?Math.cos(p)*.018:0,k=m?Math.PI+Math.sin(p*.5)*.04:e.yaw??0;if(e.ally&&e.deathAge>=0){let t=Am.includes(this.kind),n=He.smoothstep(e.deathAge,0,t?.7:.35),r=e.id%2?1:-1;t?(D=-.12*n,O=r*.16*n,T=-.12*n):(D=.25*n,O=r*1.35*n,T=.12*n);let i=He.smoothstep(e.deathAge,e.lifetime-.6,e.lifetime);T-=i*this.model.bounds.y*y*.8;let a=Math.max(0,1-e.deathAge*5),o=t?.32:.5;um.setRGB((o+a*1.2)*g,(o*.92+a*.45)*g,(o*.9+a*.3)*g)}else if(e.deathAge!==void 0&&e.deathAge>=0){let t=this.kind===`ultralisk`,n=e.weapon===`shell`||e.weapon===`cluster`,r=jm.includes(e.weapon);if(this.model.deathStart<0){let r=He.smoothstep(e.deathAge,0,t?1.35:.24);D=t?-.12*r:0,O=(e.id%2?1:-1)*r*(t?.75:1.2),T=(t?-.35:.15)*r+(!t&&n?Math.sin(r*Math.PI)*.22:0),E+=r*(t?.65:n?-.8:-.14)}let i=He.smoothstep(e.deathAge,e.lifetime-.35,e.lifetime);T-=i*this.model.bounds.y*y;let a=r?Mm:Nm;um.setRGB(a[0]*g*_,a[1]*g,a[2]*g)}else{let t=e.hit??0;if(D-=t*.075-(m?Math.min(.22,((e.gait??1)-1)*.26):0),um.setRGB((g+t*.65)*_,g+t*.28,(g+t*.1)*v),e.elite&&um.setRGB(um.r*pm[0],um.g*pm[1],um.b*pm[2]),e.frozen>0&&e.frozen<=mm){let t=Math.min(1,e.frozen/.3);um.lerp(fm,.85*t)}}Pm(cm.matrix.elements,w,T,E,D,k,O,y),this.matrices.array.set(cm.matrix.elements,n*16),um.toArray(this.tints.array,n*3),this.accents&&(a?gm.setRGB(um.r*a[0],um.g*a[1],um.b*a[2]):um).toArray(this.accents.array,n*3);let A=r-(e.shieldHitAt??-1/0);if(this.shieldSkins.length&&e.hp>0&&A>=0&&A<Cm.life){this.shieldPose.array[i]=f,this.shieldGlow.array[i]=(1-A/Cm.life)**1.6*(e.shieldBroke?Cm.broken:1);for(let e of this.shieldSkins)e.setMatrixAt(i,cm.matrix);i++}this.model.config.muzzleBones&&(e.beamMuzzles??=this.model.muzzles[f].map(()=>new J),this.model.muzzles[f].forEach((t,n)=>e.beamMuzzles[n].copy(t).applyMatrix4(cm.matrix)))}),o.forEach(t=>fp(t,e.length,t.treadShift?[this.poseFrame,t.treadShift]:[this.poseFrame]));for(let e of this.shieldSkins)fp(e,i,[this.shieldPose,this.shieldGlow])}},Im=[`raynor`,`marine`,`firebat`,`tank`,`zergling`,`hydralisk`],Lm=`thor.ultralisk.artanis.dragoon.zealot.reaver.carrier.hellion.hellbat.goliath.cyclone.sciencevessel.ares.baneling.roach.aberration.immortal.colossus.templar.siegebreaker.warpig.odin.purifierDragoon.taldarimReaver.goldenCarrier.archon.tempest.darktemplar.phoenix.junkerHellion.covertTank.junkerThor`.split(`.`);async function Rm(e,{phone:t=!1,onDeferred:n=null,commanderModels:r={},commander:i=null,trailing:a=[]}={}){let o={raynor:[13,`raynor`],marine:[Up+12,`marine`],firebat:[Up+12,`firebat`],tank:[Wp+12,`tank`],zergling:[Ol+470+256,`zergling`,{lite:t}],hydralisk:[754,`hydralisk`,{shadow:!t}],baneling:[836,`baneling`,{shadow:!t}],roach:[836,`roach`],aberration:[746,`aberration`],ultralisk:[1,`ultralisk`],thor:[Gp+12,`thor`],immortal:[Gp+12,`immortal`],colossus:[Gp+12,`colossus`],templar:[Gp+12,`templar`],warpig:[Kp.warpig+12,`marine`],siegebreaker:[Kp.siegebreaker+12,`siegebreaker`],odin:[Kp.odin+12,`thor`],archon:[16,`archon`],artanis:[13,`artanis`],dragoon:[Math.ceil(Up/2)+8+12,`dragoon`],zealot:[Up+12,`zealot`],reaver:[Wp+12,`reaver`],carrier:[Gp+12,`carrier`],tempest:[Gp+12,`tempest`],darktemplar:[Gp+12,`darktemplar`],phoenix:[Gp+12,`phoenix`],purifierDragoon:[24,`purifierDragoon`],taldarimReaver:[15,`taldarimReaver`],goldenCarrier:[13,`goldenCarrier`],hellion:[Up+12,`hellion`],hellbat:[Up+12,`hellbat`],goliath:[Gp+12,`goliath`],cyclone:[Gp+12,`cyclone`],sciencevessel:[Gp+12,`sciencevessel`],ares:[20,`ares`],junkerHellion:[24,`junkerHellion`],covertTank:[15,`covertTank`],junkerThor:[13,`junkerThor`]},s=e=>t||e===`zergling`,c={},l={},u=(t,n)=>{let[r,i,a]=o[t];c[t]=new Fm(e,n,r,i,a),n.frames.length=1,l[t]??=[]},d=Yp.filter(e=>!e.live&&o[e.id]),f=d.filter(e=>Im.includes(e.id));for(let[e,t]of await Promise.all(f.map(async e=>[e.id,await am(e.id,{phone:s(e.id)})])))u(e,t);let p=Object.fromEntries(Object.entries(r).flatMap(([e,t])=>t.map(t=>[t,e]))),h=e=>p[e.id]&&p[e.id]!==i,g=d.filter(e=>!Im.includes(e.id)&&!h(e)).sort((e,t)=>a.includes(e.id)-a.includes(t.id)||Lm.indexOf(e.id)-Lm.indexOf(t.id)),_=new Map,v=e=>{if(!_.has(e.id)){let t=am(e.id,{phone:s(e.id)}).then(t=>{c[e.id]||u(e.id,t)});t.catch(()=>{_.get(e.id)===t&&_.delete(e.id)}),_.set(e.id,t)}return _.get(e.id)},y=(async()=>{for(let[e,t]of g.entries()){try{await v(t)}catch(e){Vp(`${t.id}: ${e.message}`,`deferred`)}n?.(e+1,g.length)}})(),b=e=>{let t=d.filter(t=>p[t.id]===e&&!_.has(t.id)),r=0;return Promise.all(t.map(e=>v(e).then(()=>n?.(++r,t.length)))).then(()=>t.length)},x=document.createElement(`canvas`);x.width=x.height=64;let S=x.getContext(`2d`),C=S.createRadialGradient(32,32,0,32,32,32);C.addColorStop(0,`rgba(0,0,0,${9/15})`),C.addColorStop(.45,`rgba(0,0,0,${5/15})`),C.addColorStop(1,`rgba(0,0,0,0)`),S.fillStyle=C,S.fillRect(0,0,64,64);let w=new m(x),T=(t,n)=>{let r=new _n(new M(1,1),new rn({map:w,transparent:!0,opacity:t,depthWrite:!1}),n);return r.frustumCulled=!1,r.count=0,e.add(r),r},E=T(.6,16+Up+Wp+Z.supportCapMax+1+Kp.warpig+Kp.siegebreaker+Kp.odin+1),D=op(e,lm),O=T(.16,Ol),k=new dp;return{clear:()=>k.clear(),ready:y,prepare:b,drawnKinds:()=>Object.keys(c),handle:(e,t)=>k.handle(e,t,2.1),snapshot:()=>({corpses:k.corpses.length,pendingHits:k.pending.length+k.corpses.filter(e=>e.deathAge<0).length,bossDeathAge:k.boss?.deathAge??null}),update(e,t,n=0,r=0){k.update(n,r);for(let e of Object.values(l))e.length=0;for(let t of[e.marines,e.tanks,e.supports,e.powers?.bots??[],e.enemies,k.corpses,k.pending])for(let e of t)l[e.skin??e.kind]?.push(e);let i=e.boss&&!e.boss.dead?e.boss:k.boss;i&&l.ultralisk?.push(i);for(let[n,r]of Object.entries(c))r.update(l[n],t,e.weaponLevel??1,e.time);let a=0;for(let[t,n]of[[e.marines,1.2],[e.tanks,3.2],[e.supports,3.2],[e.boss&&!e.boss.dead?[e.boss]:[],6]])for(let e of t)cm.position.set(e.x+.15,.018,e.z+.12),cm.rotation.set(-Math.PI/2,0,0),cm.scale.set(n,n*.85,1),cm.updateMatrix(),E.setMatrixAt(a++,cm.matrix);fp(E,a);let o=0;for(let t of e.enemies){if(t.dead)continue;let e=t.kind===`zergling`?.85:t.kind===`aberration`?3:1.35;cm.position.set(t.x+.15,.016,t.z+.12),cm.rotation.set(-Math.PI/2,0,0),cm.scale.set(e,e*.85,1),cm.updateMatrix(),O.setMatrixAt(o++,cm.matrix)}fp(O,o);let s=0,u=D.geometry.attributes.shieldFade.array;for(let t of e.enemies){if(s>=lm)break;if(t.dead||!(t.shield>0)||!(t.shieldUntil>e.time))continue;let n=sp(t.kind),r=t.shieldUntil-e.time;cm.position.set(t.x,.02,t.z),cm.rotation.set(0,0,0),cm.scale.set(n,n*1.15,n),cm.updateMatrix(),D.setMatrixAt(s,cm.matrix),u[s++]=(.12+.16*t.shield/t.shieldMax)*(r>.35?1:.5+.5*Math.abs(Math.sin(r*40)))}fp(D,s,[D.geometry.attributes.shieldFade])}}}var zm=class extends nt{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new tr;e.deleteAttribute(`uv`);let t=new je({side:1}),n=new je,r=new fe(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new R(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new _n(e,n,6),o=new d;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new R(e,Bm(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new R(e,Bm(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new R(e,Bm(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new R(e,Bm(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new R(e,Bm(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let p=new R(e,Bm(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Bm(e){return new ye({color:0,emissive:16777215,emissiveIntensity:e})}export{yl as $,Ku as A,Lu as B,Rf as C,wd as D,Td as E,Qu as F,Ou as G,Mu as H,Hu as I,zl as J,Du as K,Wu as L,Ju as M,Uu as N,rd as O,Zu as P,uu as Q,Gu as R,Nf as S,Od as T,yu as U,Fu as V,pu as W,au as X,ou as Y,su as Z,sp as _,am as a,Mc as at,ip as b,zp as c,No as ct,kp as d,Oo as dt,fl as et,Ap as f,Do as ft,op as g,fp as h,Rm as i,Pc as it,Bu as j,ed as k,Rp as l,Fo as lt,xp as m,To as mt,Yp as n,Gc as nt,Vp as o,Oc as ot,Np as p,jr as pt,du as q,sm as r,Fc as rt,Lp as s,kc as st,zm as t,il as tt,Hp as u,Eo as ut,np as v,qf as w,ap as x,rp as y,Yu as z};