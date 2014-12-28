jRIAppTS framework
======

<b>a RIA framework for building Line of Buisiness (LOB) applications working in HTML5</b>
<br/>
This is a typescript version of the previous (long abandoned) <a href="https://github.com/BBGONE/jRIApp" target="_blank">jRIApp framework</a>
You can watch video of the demo on <a href="http://youtu.be/m2lxFWhJghA" target="_blank">YouTube SPA Demo</a> |
<a href="https://www.youtube.com/watch?v=bqpIARQHPhA" target="_blank">YouTube Views Transitions Animations Demo</a> |
<a href="http://youtu.be/ll_FS2iONV4" target="_blank">YouTube Folder Browser Demo</a><br/>
 
This branch uses generics introduced in typescript. The primary goal of generics here is to reduce type castings and enhance productivity with better intellisence and design time type checkings. 
The data service can generate strongly typed client side domain model (much like how it is used in Microsoft RIA services for silverlight).
See the DEMO project for the example. (the DEMODB.ts file uses autogenerated code.)
The documentation is ready now and you can read about the framework in more details.

jRIAppTS � is an application framework for developing rich internet applications - RIA�s. It consists of two parts � a client and a server parts. 
The client part was written in typescript language. The server part was  written in C#  and the demo application was implemented in ASP.NET MVC (it can also be written in other languages, for example Ruby or Java, but you have to roll up your sleeves and prepare to write them). 
The Server part resembles Microsoft WCF RIA services, featuring data services which is consumed by the clients. 
The Client part resembles  Microsoft Silverlight client development, only it is based on HTML (not XAML), and uses typescript language for coding.
The framework was designed primarily for creating data centric Line of Business (LOB) applications which will work natively in browsers without the need for plugins .
The framework supports a wide range of essential features for creating LOB applications, such as, declarative use of databindings, integration with a server side dataservice, datatemplates, client side and server side data validation, localization, authorization, and a set of UI controls, like the datagrid, the stackpanel , the dataform and a lot of  utility code.
Unlike many other existing frameworks, which use MVC design pattern, the framework uses Model View View Model (MVVM) design pattern for creating applications. 

The framework is distinguished from other frameworks available on the market by the
full stack implementation of the features required for building real world  LOB applications in HTML5. 
It allows the development in a strongly typed environment either on the client or on the server. 
The domain model is used on the client and generated by the code generation feature of the DataService (as a typescript code).

After minification jriapp.js has the size of about 311 KB. When it is gzipped, it is about 70 KB.
I recommend using the ASP.NET MVC 4 bundling feature for managing javascript files (and automatically minify them).

<b>Latest changes:</b>
<p>2014-12-28 Code optimization.</p>  
<p>2014-12-09 Update to <b>version 2.5.2</b>. Documentation update.</p>  
<p>2014-11-27 Update to <b>version 2.5.1</b>. Improved code generation of client side classes. Their structure had been changed and need be regenerated for previous 
versions. They are more compact than in the version 2.5.0.
</p>  
<p>2014-11-26 Update to <b>version 2.5.0</b>. The jRIAppTS project is now compiled by typescript 1.3 and above.
The entities' structure had been changed. The code generation is modified and so it is needed to regenerate domain models anew.
Entities only hold their own properties, like for example, customer.LastName or customer.birthDate.<br/>
Now extraneous entity functionality is separate from entities. Every entity have a property <b>'_aspect'</b> which exposes common entity methods and properties.
For example, if we have a <i>customer</i> entity we can access its <i>beginEdit</i> method like this: customer._aspect.beginEdit().<br/>
Also the BaseObject's _onError method was renamed to handleError.<br/>
Now the framework supports only strongly typed lists and dictionaries (the List and the Dictionary types were removed).
Strongly typed lists and dictionaries are typically generated using the code generation feature of the DataService.<br/><br/>
The docs for the framework will be updated shortly to reflect these changes!
</p>  

--
Maxim V. Tsapov<br/> 
<a href="https://plus.google.com/u/0/+MaximT/posts" target="_blank">I'm on Google+</a>