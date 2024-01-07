procedure sendString(const identifynumber : Integer; AStr : string);
var
  HRDEngin : HWND;
  DataStruc : TCopyDataStruct;
begin
  HRDEngin := FindWindow(nil, 'HRDEngine 1.0');
  if HRDEngin = 0 then Exit;
  with DataStruc do
  begin
    dwData := identifynumber;
    {$IF CompilerVersion >= 20.0}
      cbData := (length(AStr) + 1) * sizeof(char);
    {$ELSE}
      cbData := StrLen(PChar(AStr)) + 1;
    {$IFEND}
    //cbData := StrLen(PChar(AStr)) + 1;  working with delphi 7 project
    //cbData := (length(AStr) + 1) * sizeof(char);     //working with xe8 project
    lpData := PChar(AStr);
  end;
  SendMessage(HRDEngin, WM_COPYDATA, 0, LongInt(@DataStruc));
end;