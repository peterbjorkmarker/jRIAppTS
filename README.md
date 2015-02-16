jRIAppTS framework
======

<b>a RIA framework for building Line of Buisiness (LOB) applications working in HTML5</b>
<br/>
This is a typescript version of the previous (long abandoned) <a href="https://github.com/BBGONE/jRIApp" target="_blank">jRIApp framework</a>
You can watch video of the demo on <a href="http://youtu.be/m2lxFWhJghA" target="_blank">YouTube SPA Demo</a> |
<a href="https://www.youtube.com/watch?v=bqpIARQHPhA" target="_blank">YouTube Views Transitions Animations Demo</a> |
<a href="http://youtu.be/ll_FS2iONV4" target="_blank">YouTube Folder Browser Demo</a><br/>


<b>jRIAppTS</b> – is an application framework for developing rich internet applications - RIA’s. It consists of two parts – the client and the server parts. 
The client part was written in typescript language. The server part was  written in C#  and the demo application was implemented in ASP.NET MVC (it can also be written in other languages, for example Ruby or Java, but you have to roll up your sleeves and prepare to write them). 
The Server part resembles Microsoft WCF RIA services, featuring data services which is consumed by the clients. 
The Client part resembles  Microsoft Silverlight client development, only it is based on HTML (not XAML), and uses typescript language for coding.
The framework was designed primarily for creating data centric Line of Business (LOB) applications which will work natively in browsers without the need for plugins .
The framework supports a wide range of essential features for creating LOB applications, such as, declarative use of databindings, integration with a server side dataservice, datatemplates, client side and server side data validation, localization, authorization, and a set of UI controls, like the datagrid, the stackpanel , the dataform and a lot of  utility code.
Unlike many other existing frameworks, which use MVC design pattern, the framework uses Model View View Model (MVVM) design pattern for creating applications. 

 
Ther main project here is the <b>jriappTS</b>. It is written in typescript language. On compilation the project produces <b>jriapp.js</b> javascript file - it is the main 
file of the framework. <br/><i>P.S.- some of the modules in the framework are optional and you can compile the project without them if you decide that they are not needed 
or you want to replace them with your own ones. Read the UserGuide.pdf for the details.</i><br/> 
The <b>RIAppDemo</b> is the demo project which uses this framework and it also includes server side components of this framework - The Data Service.<br/> 
The <b>NancySelfHost</b> is another demo project which shows how to use the jriappTS framework with NancyFX framework (http://nancyfx.org/) in self hosting environment.<br/>
The <b>demoTS</b> and <b>spaAMD</b> are two typescript projects which contain code for client side part of the demo projects (the <i>RIAppDemo</i> and the <i>NancySelfHost</i>). 
On compilation those project produce a set of javascript files which are referenced in the demo projects HTML pages<br/> 

Using the data service you can generate strongly typed client side domain model in typescript language.
See the demoTS project for the example. (the DEMODB.ts file contains the generated code.)
The documentation explains how you can use the framework in more details.

The framework is distinguished from the other frameworks available on the market by the full stack implementation of the features required for 
developing real world  LOB applications in HTML5 without the need for pluggins. 
It allows the development in a strongly typed environment either on the client or on the server which is very beneficial for large projects and
code maintenance. 

After minification the <b>jriapp.js</b> file has the size of about 310 KB. After it is gzipped, it is about 70 KB.

P.S. - <i>I currently use this framework in real world projects at my work in insurance company. So the framework is tested on the real projects. 
I replaced my projects written using Microsoft Silverlight with projects which use this framework. 
I developed every feature that i needed for migration of the projects into this framework.
The framework is tested that there's <b>no memory leaks</b> when using this framework.
There's also not a single eval function used in this framework. So it works in a strict mode in the browser!
</i>

<b>Latest changes:</b>
<p>2015-02-03 Code maintenance improvement</p>  
<p>2015-02-02 Code maintenance improvement</p>  
<p>2015-02-01 Update to version 2.5.3. Now, the addEventHadler of the BaseObject class has a parameter- context, which defines the THIS object for the event handler</p>  
<p>2015-01-30 Testing and recompiling with typescript 1.4.</p>  
<p>2015-01-26 The Demo update. Included HTML5 Server Side Events (SSE) in DataGridDemo to display quotes of the day which are streamed from the server.
Updated code in the RIAPP.DataService.EF2 project. It can now produce metadata from Entity Framework's complex types. 
It is useful because in Entity Framework 6 stored procedures which return records are mapped automatically to a complex type.</p>  
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
</p>  

--
Maxim V. Tsapov<br/> 
<a href="https://plus.google.com/u/0/+MaximT/posts" target="_blank">I'm on Google+</a>