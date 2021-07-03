package com.animationexample;

import android.provider.Settings;
import android.widget.Toast;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {

    private static  ReactApplicationContext _context;

    public CustomModule(ReactApplicationContext context){
        super(context);
        _context=context;
    }

    @ReactMethod
    public void show(Promise promise){
        try{
            String deviceID= Settings.Secure.getString(_context.getContentResolver(), Settings.Secure.ANDROID_ID);
            promise.resolve(deviceID);
        }catch (Exception ex){
            promise.reject(ex);
        }
    }

    @NonNull
    @Override
    public String getName(){
        return "ABC";
    }
}
