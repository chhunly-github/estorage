procedure TForm1.WMCopyData(var Msg: TWMCopyData);
var                                                    
  sText: String;
begin
  case Msg.CopyDataStruct.dwData of
    0:
    begin
      {$IF CompilerVersion >= 20}
        sText := PChar(Msg.CopyDataStruct.lpData);
      {$ELSE}
        sText := StrPas(Msg.CopyDataStruct.lpData);
      {$IFEND}
      ProgressBar1.Position := strtoint(StrGrab(sText, '[', ']', 2));
      mmo1.Lines.Add(sText);
    end;
    1:
    begin
      {$IF CompilerVersion >= 20}
        sText := PChar(Msg.CopyDataStruct.lpData);
      {$ELSE}
        sText := StrPas(Msg.CopyDataStruct.lpData);
      {$IFEND}
      mmo1.Lines.Add(sText);
    end;
  end;
end;