jRIAppTS With Generics
======

<b>a RIA framework for building Line of Buisiness (LOB) applications working in HTML5</b>
<br/>
This is a typescript version of the previous <a href="https://github.com/BBGONE/jRIApp" target="_blank">jRIApp framework</a>
You can watch video of the demo on <a href="http://youtu.be/m2lxFWhJghA" target="_blank">YouTube SPA</a>
This branch uses generics introduced in typescript. The primary goal of generics here is to reduce type castings and enhance productivity with better intellisence and design time type checkings. 
The data service now can generate typescript classes from C# classes. This includes typed Dictionaries and Lists. 
See the DEMO project how it is implemented. (DEMODB.ts uses autogenerated code.)
The documentation is ready now and you can read about the framework in more details.

jRIAppTS � is an application framework for developing rich internet applications - RIA�s. It consists of two parts � the client and the server parts. The client part was written in typescript language. The server part was  written in C#  and the demo application was implemented in ASP.NET MVC (it can also be written in other languages, for example Ruby or Java, but you have to roll up your sleeves and prepare to write them). 
The Server part resembles Microsoft WCF RIA services, featuring data services which is consumed by the clients. 
The Client part resembles  Microsoft Silverlight client development, only it is based on HTML (not XAML), and uses typescript language for coding.
The framework was designed primarily for creating data centric Line of Business (LOB) applications which will work natively in browsers without the need for plugins .
The framework supports a wide range of essential features for creating LOB applications, such as, declarative use of databindings, integration with a server side dataservice, datatemplates, client side and server side data validation, localization, authorization, and a set of UI controls, like the datagrid, the stackpanel , the dataform and a lot of  utility code.
Unlike many other existing frameworks, which use MVC design pattern, the framework uses Model View View Model (MVVM) design pattern for creating applications. 

The framework was designed for gaining  maximum convenience and performance, and for this sake it works in browsers which support ECMA Script 5.1 level of javascript.

Those browsers include Internet Explorer 9 and above, Mozilla Firefox 4+, Google Chrome 13+, and Opera 11.6+. Because the framework is primarily designed for developing LOB applications, the exclusion of antique browsers does not harm the purpose, and improves framework�s performance and ease of use.

The framework is distinguished from other frameworks available on the market by the
full stack implementation of the features required for building real world  LOB applications in HTML5. It allows the development in strongly typed environment either on the client or on the server.

The Data centric applications are created by using framework's wide range of UI controls.
It allows to work with the server originated data in a transparent and a safe way.

The framework contains a set of controls such as: 
A DataGrid � the control for displaying and editing the data in the table form.  It supports databinding, row selection with keyboard keys, sorting by column, data paging, a detail row, data templates, different column�s types (expander column, row selector column, actions column). For editing it can use�the built-in inline editor, and also has the support for a popup editor which uses a data template for its content display.<br/>
A StackPanel - the control for displaying and editing of the data as a horizontal or vertical list . It uses a data template for its items' display and also has the support for items' selections with the help of keyboard keys and the mouse.<br/>
A ListBox - the control which encapsulates the HTML select tag and attaches to it the logic to draw the data from the collection type datasource.<br/>
A DataForm - the control which bounds a datacontext to a region and allows to use datacontents inside of this region. It also provides for summary error display.<br/>
A DbContext � the control used as a data manager to store the data (DbSets) and to cache changes on the client for submitting them to the dataservice.<br/>

The framework also has a special element view registered by the name dynacontent, which helps to create content regions on the page using data templates. 
The templates in these regions are easily switchable. This feature enables to create single page applications.<br/>

After minification jriapp.js has size about 290 KB. But it can be further gzipped, for it to reach the size of about 65 KB.
In my real world applications i use ASP.NET MVC 4 bundling feature. For desktop applications it will suffice.

You are welcome to use it in your applications.

<b>Latest changes:</b>

<p>2013-12-25   The DataService enhancements for performance reason. Also changed getting typescript code generation to a new syntax, like http://YOURSERVER/RIAppDemoService/CodeGen?type=ts<br/>
 And also for XAML and for C# code generation use it like -<br/>
 http://YOURSERVER/RIAppDemoService//CodeGen?type=xaml<br/>
 http://YOURSERVER/RIAppDemoService/CodeGen?type=csharp
</p>
<p>2013-12-28 Code generation enhancement. Now strongly typed DbSets have findEntity method, and strongly typed dictionaries have findItem method. Which have strongly typed arguments.</p>
<p>2013-12-29 <b>Changed wire dateformat!</b></p>
<p>2013-12-29 Internal DataService's code refactoring.</p>
<p>2014-01-04 <br/>1) <b>Entities- Complex type property support. Code refactoring.</b><br/>
2) Breaking changes. Wire format is changed. Instead of isNavigation, isCalculated, isClientOnly props on FieldInfo i added one enum property fieldType. It is needed to update dataservice's metadata to reflect this changes. (I used text replace in the demo)<br/>
3) In the demo project i added complex type property to Customer entity, in order to test the complex types on the entities feature.<br/>
4) In master detail demo page i databound ComplexProp.ComplexProp.Phone to a Phone textbox.<br/>
5) Tested- updates, inserts, deletes of entities with complex types<br/>
6) Also tested - change tracking, validation, validation error display for complex type properties.<br/>
P.S. The docs to be updated soon. This version will be probably a RC version.<br/>
<b>Once again thanks to typescript. Without it so much refactoring was impossible.</b><br/>
</p>
<p>2014-01-06 Code refactoring. Code generation changes. Demo update.</p>
<p>2014-01-07 DataService's code refactoring. Types and namespaces renaming. Performance improvements.</p>
<p>2014-01-08 Added a specific Model Binder for dataservice's method arguments. The serializer was changed to NewtonSoft's serializer. Performance of AJAX requests was improved by an order of magnitude.</p>
<p>2014-01-13 <b>Docs update!</b>  Added capabilities to add explicit additional dataset results to the main query result. Added new RC Version.</p>
<p>2014-01-14 Docs update. Demo app update.</p>
<p>2014-01-15 Docs update. Internal code optimization.</p>
--
Maxim V. Tsapov<br/>
Moscow, Russian Federation<br/> 
<a href="https://plus.google.com/u/0/102838307743207067758/about?tab=wX" target="_blank">I'm on Google+</a>