### Minimal reproducable bug app


On app start main and mqt_js thread will wait on mutex in a deadlock

Main thread
```
* thread #1, name = 'matedv8deadlock', stop reason = signal SIGSTOP
  * frame #0: 0xf4b39b99 [vdso]`__kernel_vsyscall + 9
    frame #1: 0xf28fcd69 libc.so`syscall + 41
    frame #2: 0xf291925f libc.so`__futex_wait_ex(void volatile*, bool, int, bool, timespec const*) + 143
    frame #3: 0xf2989bce libc.so`NonPI::MutexLockWithTimeout(pthread_mutex_internal_t*, bool, timespec const*) + 334
    frame #4: 0xf29898cc libc.so`pthread_mutex_lock + 172
    frame #5: 0xbed69d8c libv8android.so`v8::base::RecursiveMutex::Lock() + 28
    frame #6: 0xbefe26ea libv8android.so`v8::Locker::Initialize(v8::Isolate*) + 90
    frame #7: 0xbfb72326 libv8executor.so`rnv8::V8Runtime::createObject() [inlined] v8::Locker::Locker(this=0xffb23328, isolate=0xdb690030) at v8-locker.h:114:49
    frame #8: 0xbfb72316 libv8executor.so`rnv8::V8Runtime::createObject(this=0xc44cf2d0) at V8Runtime.cpp:785:14
    frame #9: 0xbafa5d18 libreanimated.so`facebook::jsi::RuntimeDecorator<facebook::jsi::Runtime, facebook::jsi::Runtime>::createObject(this=0xc44cfd5c) at decorator.h:229:19
    frame #10: 0xbafa1b04 libreanimated.so`facebook::jsi::WithRuntimeDecorator<reanimated::AroundLock, facebook::jsi::Runtime, facebook::jsi::Runtime>::createObject(this=0xc44cfd5c) at decorator.h:642:16
    frame #11: 0xbaf37afd libreanimated.so`facebook::jsi::Object::Object(this=0xffb23488, runtime=0xc44cfd5c) at jsi.h:670:45
    frame #12: 0xbb001f50 libreanimated.so`reanimated::ShareableObject::toJSValue(this=0xc44d271c, rt=0xc44cfd5c) at Shareables.cpp:234:14
    frame #13: 0xbb0028ed libreanimated.so`reanimated::ShareableWorklet::toJSValue(this=0xc44d271c, rt=0xc44cfd5c) at Shareables.cpp:262:37
    frame #14: 0xbaf61dbf libreanimated.so`facebook::jsi::Value reanimated::WorkletRuntime::runGuarded<>(this=0xc442f77c, shareableWorklet=std::__ndk1::shared_ptr<reanimated::ShareableWorklet>::element_type @ 0xc44d271c strong=2 weak=1) const at WorkletRuntime.h:42:31
    frame #15: 0xbaf7fb40 libreanimated.so`reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0::operator()(this=0xffb2370c) const at NativeReanimatedModule.cpp:211:24
    frame #16: 0xbaf7fab3 libreanimated.so`decltype(std::declval<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0&>()()) std::__ndk1::__invoke[abi:v170000]<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0&>(__f=0xffb2370c) at invoke.h:394:23
    frame #17: 0xbaf7f9f3 libreanimated.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0&>(__args=0xffb2370c) at invoke.h:487:9
    frame #18: 0xbaf7f992 libreanimated.so`std::__ndk1::__function::__alloc_func<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0, std::__ndk1::allocator<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0>, void ()>::operator()[abi:v170000](this=0xffb2370c) at function.h:185:16
    frame #19: 0xbaf7d9c6 libreanimated.so`std::__ndk1::__function::__func<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0, std::__ndk1::allocator<reanimated::NativeReanimatedModule::scheduleOnUI(facebook::jsi::Runtime&, facebook::jsi::Value const&)::$_0>, void ()>::operator()(this=0xffb23708) at function.h:356:12
    frame #20: 0xbb02e209 libreanimated.so`std::__ndk1::__function::__value_func<void ()>::operator()[abi:v170000](this=0xffb23708) const at function.h:510:16
    frame #21: 0xbb02dab3 libreanimated.so`std::__ndk1::function<void ()>::operator()(this=0xffb23708) const at function.h:1156:12
    frame #22: 0xbb0b7848 libreanimated.so`reanimated::UIScheduler::triggerUI(this=0xc442d1fc) at UIScheduler.cpp:16:5
    frame #23: 0xbb0b9f17 libreanimated.so`reanimated::AndroidUIScheduler::triggerUI(this=0xc3f98610) at AndroidUIScheduler.cpp:47:17
    frame #24: 0xbb0c39d3 libreanimated.so`facebook::jni::detail::MethodWrapper<void (reanimated::AndroidUIScheduler::*)(), &reanimated::AndroidUIScheduler::triggerUI(), reanimated::AndroidUIScheduler, void>::dispatch(ref=<unavailable>) at Registration-inl.h:129:14
    frame #25: 0xbb0c3aca libreanimated.so`facebook::jni::detail::CallWithJniConversions<void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*>), void, facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*>::call(obj=0xffb23898, func=(libreanimated.so`facebook::jni::detail::MethodWrapper<void (reanimated::AndroidUIScheduler::*)(), &reanimated::AndroidUIScheduler::triggerUI(), reanimated::AndroidUIScheduler, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*>) at Registration-inl.h:123)) at Registration-inl.h:66:5
    frame #26: 0xbb0c37a6 libreanimated.so`facebook::jni::detail::FunctionWrapper<void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*>), facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*, void>::call(env=0xf43c1e50, obj=0xffb23898, funcPtr=(libreanimated.so`facebook::jni::detail::MethodWrapper<void (reanimated::AndroidUIScheduler::*)(), &reanimated::AndroidUIScheduler::triggerUI(), reanimated::AndroidUIScheduler, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<reanimated::AndroidUIScheduler, facebook::jni::detail::BaseHybridClass>::JavaPart, facebook::jni::JObject, void>::_javaobject*>) at Registration-inl.h:123)) at Registration-inl.h:95:14
    frame #27: 0xbb0ba806 libreanimated.so`facebook::jni::detail::MethodWrapper<void (reanimated::AndroidUIScheduler::*)(), &reanimated::AndroidUIScheduler::triggerUI(), reanimated::AndroidUIScheduler, void>::call(env=0xf43c1e50, obj=0xffb23898) at Registration-inl.h:138:12
    frame #28: 0xee59d133 libart.so`art_quick_generic_jni_trampoline + 83
    frame #29: 0xee596923 libart.so`art_quick_invoke_stub + 339
...
```

mqt_js thread

```
  thread #39, name = 'mqt_js'
    frame #0: 0xf4b39b99 [vdso]`__kernel_vsyscall + 9
    frame #1: 0xf28fcd69 libc.so`syscall + 41
    frame #2: 0xf291925f libc.so`__futex_wait_ex(void volatile*, bool, int, bool, timespec const*) + 143
    frame #3: 0xf2989cde libc.so`NonPI::MutexLockWithTimeout(pthread_mutex_internal_t*, bool, timespec const*) + 606
    frame #4: 0xf29898cc libc.so`pthread_mutex_lock + 172
    frame #5: 0xc3927bec libc++_shared.so`std::__ndk1::recursive_mutex::lock() + 28
    frame #6: 0xbaf3d0e1 libreanimated.so`std::__ndk1::unique_lock<std::__ndk1::recursive_mutex>::unique_lock[abi:v170000](this=0xbcc77a30, __m=0xc3f98dbc) at __mutex_base:123:61
    frame #7: 0xbaf9d865 libreanimated.so`reanimated::WorkletRuntime::executeSync(this=0xc442f77c, rt=0xc44ca290, worklet=0xbcc78078) const at WorkletRuntime.cpp:95:15
    frame #8: 0xbaf617eb libreanimated.so`reanimated::NativeReanimatedModule::executeOnUIRuntimeSync(this=0xf4004330, rt=0xc44ca290, worklet=0xbcc78078) at NativeReanimatedModule.cpp:218:29
    frame #9: 0xbaf9479c libreanimated.so`reanimated::__hostFunction_NativeReanimatedModuleSpec_executeOnUIRuntimeSync(rt=0xc44ca290, turboModule=0xf4004330, args=0xbcc78078, (null)=1) at NativeReanimatedModuleSpec.cpp:39:9
    frame #10: 0xbb15a69d libreanimated.so`facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0::operator()(this=0xc44d849c, rt=0xc44ca290, (null)=0xbcc77fd8, args=0xbcc78078, count=1) const at TurboModule.cpp:40:34
    frame #11: 0xbb15a603 libreanimated.so`decltype(std::declval<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0&>()(std::declval<facebook::jsi::Runtime&>(), std::declval<facebook::jsi::Value const&>(), std::declval<facebook::jsi::Value const*>(), std::declval<unsigned int>())) std::__ndk1::__invoke[abi:v170000]<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0&, facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int>(__f=0xc44d849c, __args=0xc44ca290, __args=0xbcc77fd8, __args=0xbcc77d40, __args=0xbcc77d44) at invoke.h:394:23
    frame #12: 0xbb15a4ff libreanimated.so`facebook::jsi::Value std::__ndk1::__invoke_void_return_wrapper<facebook::jsi::Value, false>::__call<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0&, facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int>(__args=0xc44d849c, __args=0xc44ca290, __args=0xbcc77fd8, __args=0xbcc77d40, __args=0xbcc77d44) at invoke.h:478:16
    frame #13: 0xbb15a45a libreanimated.so`std::__ndk1::__function::__alloc_func<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0, std::__ndk1::allocator<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0>, facebook::jsi::Value (facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int)>::operator()[abi:v170000](this=0xc44d849c, __arg=0xc44ca290, __arg=0xbcc77fd8, __arg=0xbcc77d40, __arg=0xbcc77d44) at function.h:185:16
    frame #14: 0xbb158762 libreanimated.so`std::__ndk1::__function::__func<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0, std::__ndk1::allocator<facebook::react::TurboModule::get(facebook::jsi::Runtime&, facebook::jsi::PropNameID const&)::$_0>, facebook::jsi::Value (facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int)>::operator()(this=0xc44d8498, __arg=0xc44ca290, __arg=0xbcc77fd8, __arg=0xbcc77d40, __arg=0xbcc77d44) at function.h:356:12
    frame #15: 0xbfafb059 libv8executor.so`std::__ndk1::__function::__value_func<facebook::jsi::Value (facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int)>::operator()[abi:v170000](this=0xc44d8498, __args=0xc44ca290, __args=0xbcc77fd8, __args=0xbcc77d40, __args=0xbcc77d44) const at function.h:510:16
    frame #16: 0xbfaf7c59 libv8executor.so`std::__ndk1::function<facebook::jsi::Value (facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned int)>::operator()(this=0xc44d8498, __arg=0xc44ca290, __arg=0xbcc77fd8, __arg=0xbcc78078, __arg=1) const at function.h:1156:12
    frame #17: 0xbfaf6e40 libv8executor.so`rnv8::HostFunctionProxy::FunctionCallback(info=0xbcc78138) at HostProxy.cpp:238:9
    frame #18: 0xbef0ff8d libv8android.so`___lldb_unnamed_symbol22967 + 301
    frame #19: 0xbef0fa37 libv8android.so`___lldb_unnamed_symbol22962 + 807
    frame #20: 0xbef0f317 libv8android.so`___lldb_unnamed_symbol22960 + 727
    frame #21: 0xbefb68d5 libv8android.so`___lldb_unnamed_symbol24087 + 1237
    frame #22: 0xbefb63f4 libv8android.so`v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) + 228
    frame #23: 0xbeec4a6e libv8android.so`v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) + 670
    frame #24: 0xbfb7dec8 libv8executor.so`rnv8::V8Runtime::OnHostFuncionContainerCallback(args=0xbcc78878) at V8Runtime.cpp:1633:54
    frame #25: 0xbef0ff8d libv8android.so`___lldb_unnamed_symbol22967 + 301
    frame #26: 0xbef0fa37 libv8android.so`___lldb_unnamed_symbol22962 + 807
    frame #27: 0xbef0efed libv8android.so`___lldb_unnamed_symbol22959 + 317
    frame #28: 0xbedee9f7 libv8android.so
    frame #29: 0xbed85095 libv8android.so
    frame #30: 0xbed85095 libv8android.so
    frame #31: 0xbed85095 libv8android.so
    frame #32: 0xbed8f1bb libv8android.so
    frame #33: 0xbee69c69 libv8android.so
    frame #34: 0xbed85095 libv8android.so
    frame #35: 0xbed85095 libv8android.so
    frame #36: 0xbed85095 libv8android.so
    frame #37: 0xbed85095 libv8android.so
    frame #38: 0xbed85095 libv8android.so
    frame #39: 0xbed85095 libv8android.so
    frame #40: 0xbed85095 libv8android.so
    frame #41: 0xbed85095 libv8android.so
    frame #42: 0xbed85095 libv8android.so
    frame #43: 0xbed85095 libv8android.so
    frame #44: 0xbed85095 libv8android.so
    frame #45: 0xbed85095 libv8android.so
    frame #46: 0xbed85095 libv8android.so
    frame #47: 0xbed85095 libv8android.so
    frame #48: 0xbed85095 libv8android.so
    frame #49: 0xbed85095 libv8android.so
    frame #50: 0xbed85095 libv8android.so
    frame #51: 0xbed85095 libv8android.so
    frame #52: 0xbed85095 libv8android.so
    frame #53: 0xbed85095 libv8android.so
    frame #54: 0xbed85095 libv8android.so
    frame #55: 0xbed85095 libv8android.so
    frame #56: 0xbed85095 libv8android.so
    frame #57: 0xbed85095 libv8android.so
    frame #58: 0xbed85095 libv8android.so
    frame #59: 0xbed8371c libv8android.so
    frame #60: 0xbed83545 libv8android.so
    frame #61: 0xbefb717f libv8android.so`___lldb_unnamed_symbol24087 + 3455
    frame #62: 0xbefb63f4 libv8android.so`v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) + 228
    frame #63: 0xbeec4a6e libv8android.so`v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) + 670
    frame #64: 0xbfb7e80d libv8executor.so`rnv8::V8Runtime::call(this=0xc44ca290, function=0xf4501010, jsThis=0xbcc79928, args=0xbcc79a28, count=3) at V8Runtime.cpp:1418:50
    frame #65: 0xbfafa0f6 libv8executor.so`facebook::jsi::Function::call(this=0xf4501010, runtime=0xc44ca290, args=0xbcc79a28, count=3) const at jsi-inl.h:264:18
    frame #66: 0xbfaf9f37 libv8executor.so`facebook::jsi::Function::call(this=0xf4501010, runtime=0xc44ca290, args=initializer_list<facebook::jsi::Value> @ 0xbcc799bc) const at jsi-inl.h:269:10
    frame #67: 0xbfbc3f41 libv8executor.so`facebook::jsi::Value facebook::jsi::Function::call<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, facebook::jsi::Value>(this=0xf4501010, runtime=0xc44ca290, args="AppRegistry", args="runApplication", args=0xbcc79aa8) const at jsi-inl.h:277:10
    frame #68: 0xbfbc3d43 libv8executor.so`facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0::operator()(this=0xc17e1524) const at JSIExecutor.cpp:234:50
    frame #69: 0xbfbc3c43 libv8executor.so`decltype(std::declval<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0&>()()) std::__ndk1::__invoke[abi:v170000]<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0&>(__f=0xc17e1524) at invoke.h:394:23
    frame #70: 0xbfbc3b83 libv8executor.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0&>(__args=0xc17e1524) at invoke.h:487:9
    frame #71: 0xbfbc3b22 libv8executor.so`std::__ndk1::__function::__alloc_func<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0, std::__ndk1::allocator<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0>, void ()>::operator()[abi:v170000](this=0xc17e1524) at function.h:185:16
    frame #72: 0xbfbc2176 libv8executor.so`std::__ndk1::__function::__func<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0, std::__ndk1::allocator<facebook::react::JSIExecutor::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> const&, folly::dynamic const&)::$_0>, void ()>::operator()(this=0xc17e1520) at function.h:356:12
    frame #73: 0xbfba2359 libv8executor.so`std::__ndk1::__function::__value_func<void ()>::operator()[abi:v170000](this=0xbcc79e80) const at function.h:510:16
    frame #74: 0xbfba22c3 libv8executor.so`std::__ndk1::function<void ()>::operator()(this=0xbcc79e80) const at function.h:1156:12
    frame #75: 0xbfb94193 libv8executor.so`facebook::react::JSIExecutor::defaultTimeoutInvoker(invokee=0xbcc79e80) at JSIExecutor.h:107:5
    frame #76: 0xbfb9ef56 libv8executor.so`decltype(std::declval<void (*&)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>()(std::declval<std::__ndk1::function<void ()> const&>(), std::declval<std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>>())) std::__ndk1::__invoke[abi:v170000]<void (*&)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>), std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>>(__f=0xf4500fe4, __args=0xbcc79e80, __args=0xbcc79e68) at invoke.h:394:23
    frame #77: 0xbfb9ee66 libv8executor.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<void (*&)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>), std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>>(__args=0xf4500fe4, __args=0xbcc79e80, __args=0xbcc79e68) at invoke.h:487:9
    frame #78: 0xbfb9edf5 libv8executor.so`std::__ndk1::__function::__alloc_func<void (*)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>), std::__ndk1::allocator<void (*)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>, void (std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>::operator()[abi:v170000](this=0xf4500fe4, __arg=0xbcc79e80, __arg=0xbcc79e68) at function.h:185:16
    frame #79: 0xbfb9d0c9 libv8executor.so`std::__ndk1::__function::__func<void (*)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>), std::__ndk1::allocator<void (*)(std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>, void (std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>::operator()(this=0xf4500fe0, __arg=0xbcc79e80, __arg=0xbcc79e68) at function.h:356:12
    frame #80: 0xbfbc123d libv8executor.so`std::__ndk1::__function::__value_func<void (std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>::operator()[abi:v170000](this=0xf4500fe0, __args=0xbcc79e80, __args=0xbcc79e68) const at function.h:510:16
    frame #81: 0xbfbabbe3 libv8executor.so`std::__ndk1::function<void (std::__ndk1::function<void ()> const&, std::__ndk1::function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>> ()>)>::operator()(this=0xf4500fe0, __arg=0xbcc79e80, __arg=function<std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char> > ()> @ 0xbcc79e68) const at function.h:1156:12
    frame #82: 0xbfbab746 libv8executor.so`facebook::react::JSIExecutor::callFunction(this=0xf4500fb0, moduleId="AppRegistry", methodId="runApplication", arguments=0xc4407c90) at JSIExecutor.cpp:232:5
    frame #83: 0xbfff4834 libreactnativejni.so`facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0::operator()(this=0xc4407c74, executor=0xf4500fb0) const at NativeToJsBridge.cpp:205:15
    frame #84: 0xbfff44a0 libreactnativejni.so`decltype(std::declval<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0&>()(std::declval<facebook::react::JSExecutor*>())) std::__ndk1::__invoke[abi:v170000]<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0&, facebook::react::JSExecutor*>(__f=0xc4407c74, __args=0xbcc7a0a4) at invoke.h:394:23
    frame #85: 0xbfff442e libreactnativejni.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0&, facebook::react::JSExecutor*>(__args=0xc4407c74, __args=0xbcc7a0a4) at invoke.h:487:9
    frame #86: 0xbfff43f0 libreactnativejni.so`std::__ndk1::__function::__alloc_func<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0, std::__ndk1::allocator<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0>, void (facebook::react::JSExecutor*)>::operator()[abi:v170000](this=0xc4407c74, __arg=0xbcc7a0a4) at function.h:185:16
    frame #87: 0xbfff3161 libreactnativejni.so`std::__ndk1::__function::__func<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0, std::__ndk1::allocator<facebook::react::NativeToJsBridge::callFunction(std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, std::__ndk1::basic_string<char, std::__ndk1::char_traits<char>, std::__ndk1::allocator<char>>&&, folly::dynamic&&)::$_0>, void (facebook::react::JSExecutor*)>::operator()(this=0xc4407c70, __arg=0xbcc7a0a4) at function.h:356:12
    frame #88: 0xbffffd64 libreactnativejni.so`std::__ndk1::__function::__value_func<void (facebook::react::JSExecutor*)>::operator()[abi:v170000](this=0xc44cc9a8, __args=0xbcc7a0a4) const at function.h:510:16
    frame #89: 0xbffffcbc libreactnativejni.so`std::__ndk1::function<void (facebook::react::JSExecutor*)>::operator()(this=0xc44cc9a8, __arg=0xf4500fb0) const at function.h:1156:12
    frame #90: 0xbffffc75 libreactnativejni.so`facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0::operator()(this=0xc44cc998) const at NativeToJsBridge.cpp:308:9
    frame #91: 0xbffffbf4 libreactnativejni.so`decltype(std::declval<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0&>()()) std::__ndk1::__invoke[abi:v170000]<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0&>(__f=0xc44cc998) at invoke.h:394:23
    frame #92: 0xbffffb94 libreactnativejni.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0&>(__args=0xc44cc998) at invoke.h:487:9
    frame #93: 0xbffffb64 libreactnativejni.so`std::__ndk1::__function::__alloc_func<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0, std::__ndk1::allocator<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0>, void ()>::operator()[abi:v170000](this=0xc44cc998) at function.h:185:16
    frame #94: 0xbfffe817 libreactnativejni.so`std::__ndk1::__function::__func<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0, std::__ndk1::allocator<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__ndk1::function<void (facebook::react::JSExecutor*)>&&)::$_0>, void ()>::operator()(this=0xc44cc990) at function.h:356:12
    frame #95: 0xbfba2359 libv8executor.so`std::__ndk1::__function::__value_func<void ()>::operator()[abi:v170000](this=0xbcc7a228) const at function.h:510:16
    frame #96: 0xbfba22c3 libv8executor.so`std::__ndk1::function<void ()>::operator()(this=0xbcc7a228) const at function.h:1156:12
    frame #97: 0xbff01e7b libreactnativejni.so`facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0::operator()(this=0xc17e0328) at JMessageQueueThread.cpp:37:7
    frame #98: 0xbff01de4 libreactnativejni.so`decltype(std::declval<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0&>()()) std::__ndk1::__invoke[abi:v170000]<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0&>(__f=0xc17e0328) at invoke.h:394:23
    frame #99: 0xbff01d84 libreactnativejni.so`void std::__ndk1::__invoke_void_return_wrapper<void, true>::__call<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0&>(__args=0xc17e0328) at invoke.h:487:9
    frame #100: 0xbff01d54 libreactnativejni.so`std::__ndk1::__function::__alloc_func<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0, std::__ndk1::allocator<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0>, void ()>::operator()[abi:v170000](this=0xc17e0328) at function.h:185:16
    frame #101: 0xbff00ad7 libreactnativejni.so`std::__ndk1::__function::__func<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0, std::__ndk1::allocator<facebook::react::(anonymous namespace)::wrapRunnable(std::__ndk1::function<void ()>&&)::$_0>, void ()>::operator()(this=0xc17e0320) at function.h:356:12
    frame #102: 0xc3e5c6f5 libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>) [inlined] std::__ndk1::__function::__value_func<void ()>::operator()[abi:v170000](this=<unavailable>) const at function.h:510:16
    frame #103: 0xc3e5c6e4 libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>) [inlined] std::__ndk1::function<void ()>::operator()(this=<unavailable>) const at function.h:1156:12
    frame #104: 0xc3e5c6e4 libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>) [inlined] facebook::jni::JNativeRunnable::run(this=<unavailable>) at NativeRunnable.h:44:5
    frame #105: 0xc3e5c6e4 libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::dispatch(ref=alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject *> @ 0xbcc7a340) at Registration-inl.h:129:14
    frame #106: 0xc3e5c637 libfbjni.so`facebook::jni::detail::FunctionWrapper<void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>), facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*, void>::call(_JNIEnv*, _jobject*, void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>)) [inlined] facebook::jni::detail::CallWithJniConversions<void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>), void, facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>::call(obj=0xbcc7a3d8, func=<unavailable>) at Registration-inl.h:66:5
    frame #107: 0xc3e5c629 libfbjni.so`facebook::jni::detail::FunctionWrapper<void (*)(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>), facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*, void>::call(env=0xf43e7b50, obj=0xbcc7a3d8, funcPtr=(libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::dispatch(facebook::jni::alias_ref<facebook::jni::detail::JTypeFor<facebook::jni::HybridClass<facebook::jni::JNativeRunnable, facebook::jni::JRunnable>::JavaPart, facebook::jni::JRunnable, void>::_javaobject*>) at Registration-inl.h:123)) at Registration-inl.h:95:14
    frame #108: 0xc3e5c5db libfbjni.so`facebook::jni::detail::MethodWrapper<void (facebook::jni::JNativeRunnable::*)(), &facebook::jni::JNativeRunnable::run(), facebook::jni::JNativeRunnable, void>::call(env=0xf43e7b50, obj=0xbcc7a3d8) at Registration-inl.h:138:12
    frame #109: 0xee59d133 libart.so`art_quick_generic_jni_trampoline + 83
    frame #110: 0xee596923 libart.so`art_quick_invoke_stub + 339
    frame #111: 0xee62b382 libart.so`art::ArtMethod::Invoke(art::Thread*, unsigned int*, unsigned int, art::JValue*, char const*) + 242
    frame #112: 0xee7e1702 libart.so`art::interpreter::ArtInterpreterToCompiledCodeBridge(art::Thread*, art::ArtMethod*, art::ShadowFrame*, unsigned short, art::JValue*) + 386
    frame #113: 0xee7d5a3f libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1071
    frame #114: 0xee5a9b81 libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 35969
    frame #115: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #116: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #117: 0xee7d4c20 libart.so`art::interpreter::ArtInterpreterToInterpreterBridge(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*, art::JValue*) + 208
    frame #118: 0xee7d5a21 libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1041
    frame #119: 0xee5a8201 libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 29441
    frame #120: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #121: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #122: 0xee7d4c20 libart.so`art::interpreter::ArtInterpreterToInterpreterBridge(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*, art::JValue*) + 208
    frame #123: 0xee7d5a21 libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1041
    frame #124: 0xee5ac17e libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 45694
    frame #125: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #126: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #127: 0xee7d4c20 libart.so`art::interpreter::ArtInterpreterToInterpreterBridge(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*, art::JValue*) + 208
    frame #128: 0xee7d5a21 libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1041
    frame #129: 0xee5a9e4f libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 36687
    frame #130: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #131: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #132: 0xee7d4c20 libart.so`art::interpreter::ArtInterpreterToInterpreterBridge(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*, art::JValue*) + 208
    frame #133: 0xee7d5a21 libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1041
    frame #134: 0xee5a8201 libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 29441
    frame #135: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #136: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #137: 0xee7d4c20 libart.so`art::interpreter::ArtInterpreterToInterpreterBridge(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*, art::JValue*) + 208
    frame #138: 0xee7d5a21 libart.so`bool art::interpreter::DoCall<false, false>(art::ArtMethod*, art::Thread*, art::ShadowFrame&, art::Instruction const*, unsigned short, art::JValue*) + 1041
    frame #139: 0xee5a9b81 libart.so`void art::interpreter::ExecuteSwitchImplCpp<false, false>(art::interpreter::SwitchImplContext*) + 35969
    frame #140: 0xee59dde3 libart.so`ExecuteSwitchImplAsm + 19
    frame #141: 0xee7cac82 libart.so`art::interpreter::Execute(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame&, art::JValue, bool, bool) (.llvm.16375758241455872412) + 754
    frame #142: 0xee7d4b01 libart.so`art::interpreter::EnterInterpreterFromEntryPoint(art::Thread*, art::CodeItemDataAccessor const&, art::ShadowFrame*) + 177
    frame #143: 0xeebe6326 libart.so`artQuickToInterpreterBridge + 1062
    frame #144: 0xee59d20e libart.so`art_quick_to_interpreter_bridge + 78
    frame #145: 0xee596923 libart.so`art_quick_invoke_stub + 339
    frame #146: 0xee62b382 libart.so`art::ArtMethod::Invoke(art::Thread*, unsigned int*, unsigned int, art::JValue*, char const*) + 242
    frame #147: 0xeea8a37d libart.so`art::JValue art::InvokeVirtualOrInterfaceWithJValues<art::ArtMethod*>(art::ScopedObjectAccessAlreadyRunnable const&, _jobject*, art::ArtMethod*, jvalue const*) + 621
    frame #148: 0xeea8a596 libart.so`art::JValue art::InvokeVirtualOrInterfaceWithJValues<_jmethodID*>(art::ScopedObjectAccessAlreadyRunnable const&, _jobject*, _jmethodID*, jvalue const*) + 86
    frame #149: 0xeeaf2702 libart.so`art::Thread::CreateCallback(void*) + 1538
    frame #150: 0xf2988975 libc.so`__pthread_start(void*) + 101
    frame #151: 0xf291a568 libc.so`__start_thread + 72
    frame #152: 0xf28fcb87 libc.so`__bionic_clone + 71
```
