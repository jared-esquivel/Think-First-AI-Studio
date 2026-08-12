export function PromptIcon() {
  return (
    <svg
      className="think-resource-icon think-resource-icon--prompt"
      viewBox="0 0 180 150"
      aria-hidden="true"
      focusable="false"
    >
      <g className="think-resource-prompt-sparkle">
        <path d="M145 25v13" />
        <path d="M138.5 31.5h13" />
      </g>

      <path
        d="
          M36 38
          C36 31 41 26 48 26
          H119
          C126 26 131 31 131 38
          V87
          C131 94 126 99 119 99
          H79
          L61 115
          V99
          H48
          C41 99 36 94 36 87
          Z
        "
      />

      <circle cx="59" cy="63" r="3" />
      <circle cx="73" cy="63" r="3" />
      <circle cx="87" cy="63" r="3" />

      <path className="think-resource-prompt-cursor" d="M104 53v22" />

      <g className="think-resource-prompt-pencil">
        <path d="M110 112l31-31" />
        <path d="M136 76l8 8" />

        <path d="M105 117L110 104L118 112Z" />

        <path
          d="
            M137 74
            C140 71 144 71 147 74
            L150 77
            C153 80 153 84 150 87
            L145 92
            L132 79
            Z
          "
        />
      </g>
    </svg>
  );
}

export function EvaluateIcon() {
  return (
    <svg
      className="think-resource-icon think-resource-icon--evaluate"
      viewBox="0 0 180 150"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="
          M52 24
          H105
          L126 45
          V112
          C126 118 122 122 116 122
          H52
          C46 122 42 118 42 112
          V34
          C42 28 46 24 52 24
          Z
        "
      />

      <path d="M104 24v22h22" />

      <path d="M61 54h41" />
      <path d="M61 69h31" />
      <path d="M61 84h24" />

      <g className="think-resource-evaluate-magnifier">
        <circle cx="115" cy="84" r="25" />
        <path d="M133 102l21 21" />
      </g>

      <circle
        className="think-resource-evaluate-check-circle"
        cx="53"
        cy="111"
        r="15"
      />

      <path className="think-resource-evaluate-check" d="M46 111l5 5 10-11" />

      <path d="M151 39v10" />
      <path d="M146 44h10" />
    </svg>
  );
}

export function LearnIcon() {
  return (
    <svg
      className="think-resource-icon think-resource-icon--learn"
      viewBox="0 0 180 150"
      aria-hidden="true"
      focusable="false"
    >
      <text x="22" y="50" className="think-resource-icon__math">
        x²
      </text>

      <text x="143" y="76" className="think-resource-icon__math">
        +
      </text>

      <g className="think-resource-learn-brain">
        <path
          d="
            M70 58
            C62 58 57 52 57 45
            C57 38 62 32 69 31
            C72 23 79 19 87 22
            C92 16 102 17 106 24
            C114 22 123 27 124 36
            C132 39 136 47 132 54
            C129 61 122 64 114 63
            C109 70 100 72 94 67
            C87 73 76 69 74 61
            C72 60 71 59 70 58
            Z
          "
        />

        <path d="M88 29v31" />
        <path d="M88 39c-8 0-12 5-12 11" />
        <path d="M99 31c7 2 10 7 9 13" />
        <path d="M95 51c8 0 12 5 12 11" />
      </g>

      <g className="think-resource-learn-book">
        <path
          d="
            M33 91
            C50 84 67 85 88 97
            V126
            C68 116 51 115 33 120
            Z
          "
        />

        <path
          d="
            M147 91
            C130 84 113 85 92 97
            V126
            C112 116 129 115 147 120
            Z
          "
        />

        <path d="M90 97v29" />
      </g>

      <g className="think-resource-learn-sparkle">
        <path d="M138 31v14" />
        <path d="M131 38h14" />
      </g>
    </svg>
  );
}

export function BuildIcon() {
  return (
    <svg
      className="think-resource-icon think-resource-icon--build"
      viewBox="0 0 180 150"
      aria-hidden="true"
      focusable="false"
    >
      <g className="think-resource-build-gear">
        <circle cx="126" cy="42" r="19" />
        <circle cx="126" cy="42" r="7" />

        <path d="M126 17v8" />
        <path d="M126 59v8" />

        <path d="M101 42h8" />
        <path d="M143 42h8" />

        <path d="M108 24l6 6" />
        <path d="M138 54l6 6" />

        <path d="M144 24l-6 6" />
        <path d="M114 54l-6 6" />
      </g>

      <path
        d="
          M35 53
          C35 48 39 44 44 44
          H116
          C121 44 125 48 125 53
          V102
          H35
          Z
        "
      />

      <path d="M24 102H136L129 114H31Z" />

      <path d="M66 68l-10 9 10 9" />
      <path d="M94 68l10 9-10 9" />
      <path d="M87 65l-13 25" />

      <g className="think-resource-build-blocks">
        <rect x="113" y="94" width="24" height="22" rx="3" />

        <rect x="139" y="105" width="22" height="22" rx="3" />

        <rect x="116" y="118" width="22" height="19" rx="3" />

        <path d="M125 94v22" />
        <path d="M113 105h24" />
      </g>
    </svg>
  );
}
