package Homework_01;

public class Generator {
	public static void Shapei_Star(int number){
		for(int i=0;i<=number;i++){
			for(int j=0;j<i;j++){
				System.out.print(" ");
			}
			for(int j=0;j<number-i*2;j++){
				System.out.print("*");
			}
			System.out.println();
		}
	}
	public static void Shapeii_Star(int number){
		number=number+1;
		for(int i=0;i<=number;i++){
			for(int j=0;j<number-i;j++){
				System.out.print(" ");
			}
			for(int j=0;j<(number-(number-i))*2;j++){
				System.out.print("*");
			}
			System.out.println();
		}
	}
	public static void Shapeiii_ABC(int number){
		for(int i='A'+number;i>='A';i--){
			for(int j='A';j<i;j++)
				System.out.print((char)j);
			System.out.println();
		}
		
	}
	public static void Shapeiv_ABC(int number){
		for(int i='A';i<='A'+number;i++){
			for(int j='A';j<i;j++)
				System.out.print((char)j);
			System.out.println();
		}
	}
	public static void main(String[] args){
		Generator.Shapei_Star(8);
		Generator.Shapeii_Star(9);
		Generator.Shapeiii_ABC(9);
		Generator.Shapeiv_ABC(9);
	}
}
