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

<p>2013-07-30   Bug fix in a dataform usage inside templates. Corrected data bindings in these cases.</p>
<p>2013-07-30   The DataService class enhancements.Now besides getting typescript like, for example, http://YOURSERVER/RIAppDemoService/GetTypeScript<br/>
The DataService now exposes two other methods to get XAML version of the metadata and C# implementation of the dataservice's methods.<br/>
 You can test them in the DEMO using<br/>
 http://YOURSERVER/RIAppDemoService/GetXAML<br/>
 http://YOURSERVER/RIAppDemoService/GetCSharp
</p>
<p>2013-08-31  Published generics version of the framework - <b>tested to work and to be compilable with 0.9.1.1 version of the compiler.</b></p>
<p>2013-09-07  Improved typed List and Dictionary code generation, to include properties' data types.</p>
<p>2013-09-09  List and Dictionary code modifications</p>
<p>2013-09-20  CSharp enums to typescript enums dataservice's code generation</p>
<p>2013-09-25  Bug fix in the datagrid</p>
<p>2013-10-19  Improvements in the code generation</p>
<p>2013-11-13  Changes in dataservice's query methods. Now, they don't accept GetDataInfo parameter as a method's argument!
It is accessible now through dataservice's CurrentQueryInfo property. See demo detaservice for example.</p>
<p>2013-11-14  Improvements in the dataservice's code. Now query methods and service methods can accept complex type arguments. Fixed bug in dataservice's authorizer class. Improved code generation.</p>
<p>2013-11-23  Updated jriappTS code to be compilable using <b>the typescript v0.95 beta compiler</b></p>
<p>2013-11-26  Code modernization</p>
<p>2013-11-29  jriappTS typescript solution was split into two parts. <br/>1) jriappTS - the framework's code<br/>2) demoTS - the code (user modules) for the DEMO ASP.NET MVC project.</p>
<p>2013-11-29  Added <b>User's Guide</b> (meap). It requires some editing, but it is better than nothing.</p>
<p>2013-12-03  <br/>1) <b>Code refactoring with breaking changes</b><br/>
2) Added a new module datepicker.ts. It implements IDatePicker interface, so the datepicker can be easily swapped with another implementation.<br/>
3) Added a new element view, registered with the name: <b>datepicker</b>. It allows to add a datepicker declaratively. See the DataGrid demo- in its filter parameter section it is used to enter the sales dates.<br/>
4) Date values now displayed by default without a datepicker. You need to add name=datepicker in the data-content attribute's value. See the DataGrid demo - in the edit dialog.<br/>
5) Replaced dependency of the framework from date.js to moment.js. It is more widely used js library that date.js, and better coexists with other libs.<b>It requires different date format.For example, DD.MM.YYYY instead of dd.MM.yyyy</b><br/>
6) The defaults for datepicker's datetime format are factored out into separate property on global.defaults. See the Defaults class.<br/>
7) Composing filtering and sorting in queries now use enums FILTER_TYPE and SORT_ORDER instead of string literals.<br/>
8) updated the DEMO project to work properly after those changes.<br/>
P.S. after these changes i will soon commit new docs version.<br/>So many changes was made because Typescript 0.95 much better than 0.91 and it is easy to do when you have a proper tool. With javascript the refactoring on such scale was impossible.
</p>
<p>2013-12-04 Code refactoring and documentation update.</p>
<p>2013-12-05 documentation update.</p>
<p>2013-12-06 <b>Wire format change!</b> documentation update.<br/>
A security switch to enable disable invocation of GetTypeScript, GetCSharp, GetXAML methods.<br/>
Fixed product image uploading in the DEMO.
</p>
<p>2013-12-25   The DataService enhancements for performance reason. Also changed getting typescript code generation to a new syntax, like http://YOURSERVER/RIAppDemoService/CodeGen?type=ts<br/>
 And also for XAML and for C# code generation use it like -<br/>
 http://YOURSERVER/RIAppDemoService//CodeGen?type=xaml<br/>
 http://YOURSERVER/RIAppDemoService/CodeGen?type=csharp
</p>
<p>2013-12-28 Code generation enhancement. Now strongly typed DbSets have findEntity method, and strongly typed dictionaries have findItem method. Which have strongly typed arguments.</p>

--
Maxim V. Tsapov<br/>
Moscow, Russian Federation<br/> 
<a href="https://plus.google.com/u/0/102838307743207067758/about?tab=wX" target="_blank">I'm on Google+</a>