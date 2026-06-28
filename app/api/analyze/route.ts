import { NextResponse } from "next/server";
import { analyzeLifeEntry } from "@/lib/lifeMemoryEngine";
import { analyzeLifeEntryWithAI } from "@/lib/aiLifeAnalyzer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      rawText?: string;
      sourceCategoryId?: string;
    };

    const rawText = body.rawText?.trim() ?? "";

    if (!rawText) {
      return NextResponse.json(
        { error: "rawText is required" },
        { status: 400 }
      );
    }

    const fallbackAnalysis = analyzeLifeEntry({
      rawText,
      sourceCategoryId: body.sourceCategoryId,
    });

    const aiAnalysis = await analyzeLifeEntryWithAI({
      rawText,
      sourceCategoryId: body.sourceCategoryId,
      fallbackAnalysis,
    });

    return NextResponse.json(aiAnalysis);
  } catch {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}