unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, OleCtrls, SHDocVw, MSHTML, activeX,
  HrdIndyAgent, HRDUtils;

type
  TForm1 = class(TForm)
    edtaddress: TEdit;
    edtusername: TEdit;
    lblusername: TLabel;
    edtpassword: TEdit;
    lbl1: TLabel;
    btnlogin: TButton;
    wbbrowser: TWebBrowser;
    procedure FormCreate(Sender: TObject);
    procedure btnloginClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
  wbbrowser.Navigate('about:blank');

end;

procedure TForm1.btnloginClick(Sender: TObject);
var
  Document : IHTMLDocument2;
  v : OleVariant;
  agent : THrdIndyAgent;
  query : string;
  Element : IHTMLInputElement;
  commonjs, script, evalue, nvalue, sessionkey, keyname , rsaencript, encname: string;
begin

  Document := wbbrowser.Document as IHTMLDocument2;
  agent := THrdIndyAgent.Create;
  agent.connect('https://nid.naver.com/login/js/common.all.js?141216');
  commonjs := agent.resultStr;
  v       := VarArrayCreate([0,0], varVariant);
  v[0]    := '<HTML>'
          +     '<HEAD>NAVER PROPERTIES</HEAD>'
          +     '<BODY>'
          +       '<p>Hello world</P>'
          +       '<input id="rsaencript" value=""/>'
          +       '<input id="encname" value=""/>'
          +       '<script id="commonjs">'
          +         commonjs
          +       '</script>'
          +     '</BODY>'
          + '</HTML>';
  Document.write(PSafeArray(TVarData(v).Varray));
  Document.close;

  Document := wbbrowser.Document as IHTMLDocument2;
  agent.connect('https://nid.naver.com/login/ext/keys_js2.nhn');
  evalue := trim(strgrab(agent.resultStr, 'evalue = ''', ''';'));
  nvalue := trim(strgrab(agent.resultStr, 'nvalue = ''', ''';'));
  sessionkey := trim(strgrab(agent.resultStr, 'sessionkey = ''', ''';'));
  keyname := trim(strgrab(agent.resultStr, 'keyname = ''', ''';'));
  script := 'var rsa = new RSAKey;'
          + 'rsa.setPublic("'+ evalue +'","' + nvalue +'");'
          + 'var encryptvalue = rsa.encrypt('
          + 'getLenChar("' + sessionkey +'")'
          + '+ "' + sessionkey + '"'
          + '+ getLenChar("'+ edtusername.text +'") + "'+ edtusername.text
          + '"+ getLenChar("'+ edtpassword.text +'") + "'+ edtpassword.text +'");'
          + 'document.getElementById("rsaencript").value=encryptvalue;'
          + 'document.getElementById("encname").value="'+keyname
          + '";alert(document.getElementById("rsaencript").value+"\n"+document.getElementById("encname").value);'
          ;
  Document.parentWindow.execScript(script,'JavaScript');
  //agent.connect('https://nid.naver.com/nidlogin.login', '');
  Element := Document.all.item('rsaencript', 0) as IHTMLInputElement;
  rsaencript := Element.value;
  Element := Document.all.item('encname', 0) as IHTMLInputElement;
  encname := Element.value;

  query :=   'enctp=2' 
          +  '&encpw=78454545'
          +  '&encnm=2212245'
          +  '&svctype=0'
          +  '&svc='
          +  '&viewtype=0'
          +  '&locale=en_US'
          +  '&postDataKey='
          +  '&smart_LEVEL=1'
          +  '&logintp='
          +  '&url=http%3A%2F%2Fwww.naver.com%3Fmobile'
          +  '&localechange='
          +  '&theme_mode='
          +  '&ls='
          +  '&pre_id='
          +  '&resp='
          +  '&exp='
          +  '&ru='
          +  '&id='
          +  '&pw=';

  agent.connect('https://nid.naver.com/nidlogin.login', query);
  MessageBox(0, PChar(agent.resultStr),0,0);
end;

end.
